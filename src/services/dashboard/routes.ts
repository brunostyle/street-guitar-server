import { Router } from "express";
import { DashboardController } from "./controller";

export class DashboardRoutes {
    static get routes() {
        const router = Router();
        const controller = new DashboardController;

        router.get('/', controller.getStats);

        return router;
    }
}