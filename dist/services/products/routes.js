"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const validate_1 = require("./validate");
const controller_1 = require("./controller");
class ProductRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const validate = new validate_1.ProductValidate();
        const controller = new controller_1.ProductController();
        router.get('/', validate.getProducts(), controller.getProducts);
        router.get('/:id', validate.getProductById(), controller.getProductById);
        router.post('/', validate.createProduct(), controller.createProduct);
        router.put('/:id', validate.updateProduct(), controller.updateProduct);
        router.delete('/:id', validate.deleteProduct(), controller.deleteProduct);
        return router;
    }
}
exports.ProductRoutes = ProductRoutes;
