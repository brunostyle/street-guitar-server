import { Router } from "express";
import { UploadController } from "./controller";
import { UploadValidate } from "./validate";

export class UploadRoutes {
    static get routes() {
        const router = Router();
        const validate = new UploadValidate;
        const controller = new UploadController;

        router.post('/image/:collection', validate.uploadImage(), controller.uploadFile);
        router.put('/image/:collection', validate.deleteImage(), controller.deleteFile);

        router.post('/file/:collection', validate.uploadFile(), controller.uploadFile);
        router.put('/file/:collection', validate.deleteFile(), controller.deleteFile);

        return router;
    }
}