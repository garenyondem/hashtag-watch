// Highlights the relationship between the users who posted the tweets in a graph model. The criteria
// based on which the relationship would be established is up to you and can be based on any metadata
// that you can get from the Twitter API. You can use one or more criteria.

import config, { IConfig } from "./config";
import { Server } from "./app";
import { MongoManager } from "./db/mongo";
import "./extensions";

init(config).catch(err => {
    console.error(err);
    process.exit();
});

export async function init(config: IConfig) {
    await new MongoManager(
        config.mongo.host,
        config.mongo.port,
        config.mongo.db
    ).connect();
    const serv = new Server(config.node.port);
    serv.start();
}
