import dotenv from "dotenv";
import { NODE_ENV } from "../utils/enums";

const envFound = dotenv.config();
if (!envFound) {
    console.error("Could not find .env file or it is not specified");
    process.exit();
}

process.env.NODE_ENV = process.env.NODE_ENV || NODE_ENV.DEVELOPMENT;

export interface IConfig {
    node: { env: string; port: string };
    jwtSecret: string;
    mongo: { host: string; port: string; db: string };
    es: { host: string; port: string };
    twitter: {
        consumerKey: string;
        consumerSecret: string;
        accessToken: string;
        accessTokenSecret: string;
    };
}

export default {
    node: {
        env: process.env.NODE_ENV,
        port: process.env.NODE_PORT || ""
    },
    jwtSecret: process.env.JWT_SECRET || "",
    mongo: {
        host: process.env.MONGO_HOST || "",
        port: process.env.MONGO_PORT || "",
        db: process.env.MONGO_DB || ""
    },
    es: {
        host: process.env.ES_HOST || "",
        port: process.env.ES_PORT || ""
    },
    twitter: {
        consumerKey: process.env.TWITTER_API_KEY || "",
        consumerSecret: process.env.TWITTER_API_SECRET || "",
        accessToken: process.env.TWITTER_ACCESS_TOKEN || "",
        accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ""
    }
} as IConfig;
