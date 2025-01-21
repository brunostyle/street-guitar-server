/// <reference path="./types/types.d.ts" />
import { Mongo } from './database/mongo';
import { Server } from "./server";

const main = async () => {
    await Mongo.connect();
    const server = new Server();
    server.start();
}

(() => {
    main();
})();