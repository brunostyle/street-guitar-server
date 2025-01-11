import { Router } from "express";
import { UploadController } from "./controller";
import { UploadValidate } from "./validate";

export class UploadRoutes {
    static get routes() {
        const router = Router();
        const validate = new UploadValidate;
        const controller = new UploadController;

        router.post('/image/:collection', validate.uploadImage(), controller.uploadImage);
        router.put('/image/:collection', validate.deleteImage(), controller.deleteImage);

        router.post('/file', validate.uploadFile(), controller.uploadFile);
        router.put('/file', validate.deleteFile(), controller.deleteFile);

















        













        // router.post('/user/:id', validate.uploadUserFile(), controller.uploadUserFile);
        // router.post('/product/tab/:id', validate.uploadProductFile(), controller.uploadProductTab);

        // router.post('/product/images/:id', validate.uploadProductFile(), controller.uploadProductImages);
        // router.put('/product/images/:id', validate.deleteUploadProductFile(), controller.deleteUploadProductFile);


        return router;
    }
}