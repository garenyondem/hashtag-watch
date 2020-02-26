interface ITwitterUser {
    id_str: string; // The string representation of the unique identifier for this User.
    name: string | null;
    screen_name: string | null; // handle, or alias that this user identifies themselves with
    followers_count: number;
}

interface ITwitterTweet {
    text: string; // The actual UTF-8 text of the status update.
    user: ITwitterUser; // The user who posted this Tweet.
    id_str: string; // The string representation of the unique identifier for this Tweet.
    created_at: string; // UTC time when this Tweet was created
    source: string; // Utility used to post the Tweet,
}

export { ITwitterUser, ITwitterTweet };
