"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const validate_1 = require("./validate");
const controller_1 = require("./controller");
class OrderRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const validate = new validate_1.OrderValidate();
        const controller = new controller_1.OrderController();
        router.get('/', validate.getOrders(), controller.getOrders);
        router.get('/:id', validate.getOrderById(), controller.getOrderById);
        router.post('/', validate.createOrder(), controller.createOrder);
        router.put('/:id', validate.updateOrder(), controller.updateOrder);
        router.delete('/:id', validate.deleteOrder(), controller.deleteOrder);
        return router;
    }
}
exports.OrderRoutes = OrderRoutes;
