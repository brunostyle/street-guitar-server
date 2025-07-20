import { Router } from "express";
import { ProductValidate } from "./validate";
import { ProductController } from "./controller";

export class ProductRoutes {
    static get routes() {
        const router = Router();
        const validate = new ProductValidate();
        const controller = new ProductController();

        router.get('/', validate.getProducts(), controller.getProducts);
        router.get('/:id', validate.getProductById(), controller.getProductById);
        router.get('/category/:category', validate.getProductByCategory(), controller.getProductByCategory);
        router.get('/difficulty/:difficulty', validate.getProductByDifficulty(), controller.getProductByDifficulty);
        router.get('/query/:title', validate.getProductByQuery(), controller.getProductByQuery);
        router.post('/', validate.createProduct(), controller.createProduct);
        router.put('/:id', validate.updateProduct(), controller.updateProduct);
        router.delete('/:id', validate.deleteProduct(), controller.deleteProduct);

        return router;
    }
}