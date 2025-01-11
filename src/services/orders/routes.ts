import { Router } from "express";
import { OrderValidate } from "./validate";
import { OrderController } from "./controller";

export class OrderRoutes {
    static get routes() {
        const router = Router();
        const validate = new OrderValidate();
        const controller = new OrderController();

        router.get('/', validate.getOrders(), controller.getOrders);
        router.get('/:id', validate.getOrderById(), controller.getOrderById);
        router.post('/', validate.createOrder(), controller.createOrder);
        router.put('/:id', validate.updateOrder(), controller.updateOrder);
        router.delete('/:id', validate.deleteOrder(), controller.deleteOrder);

        return router;
    }
}