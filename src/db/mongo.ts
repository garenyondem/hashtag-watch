import mongoose, { ConnectionOptions, Mongoose } from "mongoose";
import { MONGOOSE_EVENT, NODE_ENV } from "../utils/enums";
import config from "../config";

export class MongoManager {
    public db: Mongoose;
    #options: ConnectionOptions;
    #host: string;
    #port: string;
    #db: string;

    constructor(host: string, port: string, db: string, connOptions?: ConnectionOptions) {
        this.#host = host;
        this.#port = port;
        this.#db = db;
        this.#options = connOptions || {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        };

        if (config.node.env === NODE_ENV.DEVELOPMENT) {
            mongoose.set("debug", true);
        }

        mongoose.connection
            .on(MONGOOSE_EVENT.CONNECTED, () => {
                console.info('Mongo connection ok');
            })
            .on(MONGOOSE_EVENT.ERROR, err => {
                console.info(`Mongo connection error ${err}`)
            });
        this.db = mongoose;
    }

    private get uri() {
        return `mongodb://${this.#host}:${this.#port}/${this.#db}`;
    }

    public connect = async (): Promise<Mongoose> => {
        return this.db.connect(this.uri, this.#options);
    };
}
