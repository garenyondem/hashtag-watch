//@ts-ignore
import Twitter from "twitter-lite";

export class TwitterService {
    #twitterClient: Twitter;
    constructor(options: { consumerKey: string, consumerSecret: string, acToken: string, acSecret: string }) {
        this.#twitterClient = new Twitter({
            consumer_key: options.consumerKey,
            consumer_secret: options.consumerSecret,
            access_token_key: options.acToken,
            access_token_secret: options.acSecret
        });
    }

    getStreamOf(params?: { track: string }) {
        return this.#twitterClient.stream("statuses/filter", params);
    }
}