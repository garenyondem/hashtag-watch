export enum NODE_ENV {
    DEVELOPMENT = "development",
    PRODUCTION = "production"
}

export enum MONGOOSE_EVENT {
    CONNECTED = "connected",
    ERROR = "error"
}

export const enum HTTP_STATUS_CODE {
    OK = 200,
    MOVED = 301,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export const enum DATA_SOURCES {
    TWITTER = "twitter",
    TWITCH = "twitch",
    FACEBOOK = "facebook"
}

export const enum SSE_EVENTS {
    INCREMENET_SAVED_TWEETS_COUNT = "increment-saved-tweets-count",
    TOTAL_TWEETS_COUNT = "total-tweets-count"
}

export const enum TWITTER_STREAM_EVENTS {
    START = "start",
    DATA = "data",
    PING = "ping",
    ERROR = "error",
    END = "end"
}
