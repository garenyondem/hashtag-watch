import express, { Express } from "express";
import { routes } from "./routes";
import path from "path";
import http from 'http';
import { authenticate, ignoreFavicon } from './middlewares';

export class Server {
    public app: Express;
    public httpServer: http.Server | undefined;
    #port: string;

    constructor(port: string) {
        const app = express();

        app.use(ignoreFavicon);
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        app.use('/', express.static(path.join(__dirname, 'public')));
        app.use("/api", /*authenticate,*/ routes);
        this.app = app;
        this.#port = port;
    }

    public start = () => {
        this.httpServer = this.app.listen(this.#port);
        console.info(`http://localhost:${this.#port}`);
    };
}

