import 'dotenv/config';
import { AppRoutes } from "./routes";
import { Server } from "./server";
import { Mongo } from './database/mongo';

const main = async () => {
    await Mongo.connect({
        mongoURL: process.env.MONGO_URL ?? '',
    });

    const server = new Server({
        port: process.env.PORT ?? 4000,
        routes: AppRoutes.routes
    });
    server.start();
}

(() => {
    main();
})();