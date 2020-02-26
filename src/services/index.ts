import { TwitterService } from "./twitter";
import config from "../config";
import { JwtService } from "./jwt";

export const twitterService = new TwitterService({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    acToken: config.twitter.accessToken,
    acSecret: config.twitter.accessTokenSecret
});

export const jwtService = new JwtService(config.jwtSecret);
