import "../src/extensions";
import config, { IConfig } from "../src/config";
import { Server } from "../src/app";
import { MongoManager } from "../src/db/mongo";
// @ts-ignore
import EventSource from "eventsource";
import { expect } from "chai";
import { SSE_EVENTS } from "../src/utils/enums";
import { Mongoose } from "mongoose";
import once from "once";

let server: Server;
let twitterEs: EventSource;
let dbConnections: Mongoose;
const host = `http://localhost:${config.node.port}`;
const tag = "apple";
const source = "twitter";

before(async () => {
    dbConnections = dbConnections ?? (await createDBconns(config.mongo));
    server = server ?? createServer(config.node.port);
    process.nextTick(() => {
        // make sure server is ready before connectiong
        twitterEs = twitterEs ?? createTwitterEventSource(host, tag, [source]);
    });
});

after(async () => {
    twitterEs.close();
    server.httpServer?.close();
    await dbConnections.disconnect();
});

describe("SSE /api/watch", function() {
    context("new tweet event", function() {
        it("should receive ping for incrementation", done => {
            done = once(done);
            twitterEs.addEventListener(
                SSE_EVENTS.INCREMENET_SAVED_TWEETS_COUNT,
                (event: { origin: string }) => {
                    try {
                        expect(event).not.to.be.undefined;
                        expect(event.origin).to.be.equal(host);
                        done();
                    } catch (err) {
                        done(err);
                    }
                }
            );
        });
        after(done => {
            twitterEs.removeEventListener(
                SSE_EVENTS.INCREMENET_SAVED_TWEETS_COUNT
            );
            done();
        });
    });

    context("cached tweets event", function() {
        it("should receive the total number of cached tweets in Elasticsearch", done => {
            done = once(done);
            twitterEs.addEventListener(
                SSE_EVENTS.TOTAL_TWEETS_COUNT,
                (event: { origin: string; data: string }) => {
                    try {
                        expect(event.origin).to.be.equal(host);
                        expect(parseInt(event.data)).to.be.above(0);
                        done();
                    } catch (err) {
                        done(err);
                    }
                }
            );
        });
        after(done => {
            twitterEs.removeEventListener(SSE_EVENTS.TOTAL_TWEETS_COUNT);
            done();
        });
    });
});

async function createDBconns({
    host,
    port,
    db
}: IConfig["mongo"]): Promise<Mongoose> {
    return new MongoManager(host, port, db).connect();
}

function createServer(port: string): Server {
    const serv = new Server(port);
    serv.start();
    return serv;
}

function createTwitterEventSource(
    host: string,
    tag: string,
    sources: string[]
): EventSource {
    const encodedTag = encodeURIComponent(tag);
    return new EventSource(
        `${host}/api/watch?&tag=${encodedTag}&source=${sources.join(",")}`
    );
}
