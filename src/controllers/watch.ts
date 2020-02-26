import { Request, Response } from "express";
import {
    DATA_SOURCES,
    HTTP_STATUS_CODE,
    SSE_EVENTS,
    TWITTER_STREAM_EVENTS
} from "../utils/enums";
import { constructEventPayload, formatTag } from "../utils/helpers";
import { twitterService } from "../services";
import TweetModel from "../models/tweet";
import { ITwitterTweet } from "../utils/types";
import { CACHE_SIZE_HEARTBEAT_INTERVAL } from "../utils/constants";

export function watch(req: Request, res: Response): void {
    const { source, tag } = req.query;
    const sources = new Set(source.split(","));

    if (sources.has(DATA_SOURCES.TWITTER)) {
        res.writeHead(200, {
            "Cache-Control": "no-cache",
            "Content-Type": "text/event-stream",
            Connection: "keep-alive"
        });

        const stream = twitterService
            .getStreamOf({
                track: formatTag(tag)
            })
            .on(TWITTER_STREAM_EVENTS.START, () =>
                console.info(`Watching tweets from ${tag}`)
            )
            .on(TWITTER_STREAM_EVENTS.DATA, async (tweet: ITwitterTweet) => {
                await TweetModel.cacheAndSave(tweet);
                res.write(
                    constructEventPayload({
                        event: SSE_EVENTS.INCREMENET_SAVED_TWEETS_COUNT
                    })
                );
            })
            .on(TWITTER_STREAM_EVENTS.PING, () =>
                console.info("stream heartbeat")
            )
            .on(TWITTER_STREAM_EVENTS.ERROR, (error: Error) =>
                console.error("error", error)
            )
            .on(TWITTER_STREAM_EVENTS.END, () => console.info("end"));

        let totalCountInterval = setInterval(() => {
            //@ts-ignore
            TweetModel.esCount((err: Error, result) => {
                if (!err) {
                    res.write(
                        constructEventPayload({
                            body: result.count.toString(),
                            event: SSE_EVENTS.TOTAL_TWEETS_COUNT
                        })
                    );
                }
            });
        }, CACHE_SIZE_HEARTBEAT_INTERVAL);
    } else {
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send();
    }
}
