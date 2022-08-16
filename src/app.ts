import express from "express";
import { Config } from "./infrastructure/config";
import { AbstractRoute } from "./routes/abstract/abstract.routes";
import { SongRoute } from "./routes/song/song.routes";

export class App {

    private express: express.Application = express();
    private env: string;
    private port: string | number;

    constructor() {
        this.applyServerMiddlewares();
        this.initialiseRoutes(
            [
                new SongRoute(this.express, 'song')
            ]
        );
        this.env = Config.NODE_ENV || 'development';
        this.port = Config.PORT || 3000;
    }

    private applyServerMiddlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded());
    }

    private initialiseRoutes(routes: AbstractRoute[]) {
        routes.forEach(route => {
            route.initialiseRoute();
        })
    }

    get environment() {
        return this.env;
    }

    get server() {
        return this.express;
    }

    public start() {
        this.express.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}