import { Schema, model, Types, Document, Model } from "mongoose";
//@ts-ignore
import mongoosastic from "mongoosastic";
import config from "../config";
import { ITwitterTweet } from "../utils/types";

interface ITweet extends Document {
    _id: Types.ObjectId;
    text: string;
    tweetId: string;
    tweetDate: Date;
    platform: string;
    senderId: string;
    senderName: string | null;
    senderScreenName: string | null;
    senderFollowersCount: number;
    hashTag: string;
}

export interface ITweetModel extends Model<ITweet> {
    cacheAndSave(twitterTweet: ITwitterTweet): Promise<ITweet>;
}

const tweetSchema: Schema = new Schema(
    {
        text: String,
        tweetId: String,
        tweetDate: Date,
        platform: String,
        senderId: String,
        senderName: String,
        senderScreenName: String,
        senderFollowersCount: Number,
        hashTag: String
    },
    { timestamps: true, versionKey: false }
);

// Adding ES functionality to Mongoose object
tweetSchema.plugin(mongoosastic, {
    host: config.es.host,
    port: config.es.port
    // type: "_doc"
});

class TweetClass {
    // save to mongodb and elasticsearch
    static async cacheAndSave(twitterTweet: ITwitterTweet): Promise<ITweet> {
        const tweetItem = new TweetModel();
        tweetItem.text = twitterTweet.text;
        tweetItem.tweetId = twitterTweet.id_str;
        tweetItem.tweetDate = twitterTweet.created_at.toDate();
        tweetItem.platform = twitterTweet.source;
        tweetItem.senderId = twitterTweet.user.id_str;
        tweetItem.senderName = twitterTweet.user.name;
        tweetItem.senderScreenName = twitterTweet.user.screen_name;
        tweetItem.senderFollowersCount = twitterTweet.user.followers_count;
        return tweetItem.save();
    }
}

tweetSchema.loadClass(TweetClass);

const TweetModel = model<ITweet>("Tweet", tweetSchema) as ITweetModel;

export { TweetModel as default };
