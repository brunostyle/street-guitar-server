import { Router } from "express";
import { UserRoutes } from "./services/users/router";
import { OrderRoutes } from "./services/orders/routes";
import { ProductRoutes } from "./services/products/routes";
import { UploadRoutes } from "./services/uploads/routes";
import { DashboardRoutes } from "./services/dashboard/routes";

export class AppRoutes {
    static get routes() {
        const router = Router();

        router.use('/api/dashboard', DashboardRoutes.routes);
        router.use('/api/users', UserRoutes.routes);
        router.use('/api/orders', OrderRoutes.routes);
        router.use('/api/products', ProductRoutes.routes);
        router.use('/api/uploads', UploadRoutes.routes);

        return router;
    }
}