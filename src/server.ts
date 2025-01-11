import express, { Router } from "express";
import cors from 'cors';
import fileUpload from 'express-fileupload';

interface Options {
    port: number | string;
    routes: Router;
}

export class Server {
    private app = express();
    private port;
    private routes;

    constructor({ port, routes }: Options) {
        this.port = port;
        this.routes = routes;
    }

    async start() {
        //Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(cors());
        this.app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

        //Routes
        this.app.use(this.routes);

        //Server
        this.app.listen(this.port, () => {
            console.log('Server listening on port', this.port);
        });
    }
}