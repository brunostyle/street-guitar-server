"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const validate_1 = require("./validate");
class UploadRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const validate = new validate_1.UploadValidate;
        const controller = new controller_1.UploadController;
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
exports.UploadRoutes = UploadRoutes;
