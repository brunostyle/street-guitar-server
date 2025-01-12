import { Router } from "express";
import { DashboardValidate } from "./validate";
import { DashboardController } from "./controller";

export class DashboardRoutes {
    static get routes() {
        const router = Router();
        const validate = new DashboardValidate;
        const controller = new DashboardController;

        router.get('/', validate.getStats(), controller.getStats);

        return router;
    }
}