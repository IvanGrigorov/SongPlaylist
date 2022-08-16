import express from "express";
import { Route } from "../../interfaces/routes/route";

export abstract class AbstractRoute implements Route {

    basePath: string;
    restQuery: string;
    app: express.Application;


    constructor (app: express.Application,  restQuery: string = '', basePath: string = '/') {
        this.basePath = basePath;
        this.restQuery = restQuery;
        this.app = app;
    }

    public abstract initialiseRoute() : void;
}