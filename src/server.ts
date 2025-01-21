import express from "express";
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { AppRoutes } from "./routes";

export class Server {
    private app;
    private port;
    private router;

    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? 4000;
        this.router = AppRoutes.routes;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(cors());
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));
    }

    routes() {
        this.app.use(this.router);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port', this.port);
        });
    }
}