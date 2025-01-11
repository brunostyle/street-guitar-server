"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const router_1 = require("./services/users/router");
const routes_1 = require("./services/orders/routes");
const routes_2 = require("./services/products/routes");
const routes_3 = require("./services/uploads/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/users', router_1.UserRoutes.routes);
        router.use('/api/orders', routes_1.OrderRoutes.routes);
        router.use('/api/products', routes_2.ProductRoutes.routes);
        router.use('/api/uploads', routes_3.UploadRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
