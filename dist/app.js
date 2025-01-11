"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
process.loadEnvFile();
const routes_1 = require("./routes");
const server_1 = require("./server");
const mongo_1 = require("./database/mongo");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    yield mongo_1.Mongo.connect({
        mongoURL: (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : '',
    });
    const server = new server_1.Server({
        port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 4000,
        routes: routes_1.AppRoutes.routes
    });
    server.start();
});
(() => {
    main();
})();
