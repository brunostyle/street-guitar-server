"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadValidate = void 0;
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../../middlewares");
class UploadValidate {
    constructor() {
        this.uploadImage = () => ([
            // validateJWT,
            middlewares_1.validateFile,
            middlewares_1.validateExtensionImage,
            (0, express_validator_1.check)('collection', 'Coleccion no valida').isIn(['users', 'tabs']),
            middlewares_1.validateField
        ]);
        this.deleteImage = () => ([
            middlewares_1.validateJWT,
            (0, express_validator_1.check)('collection', 'Coleccion no valida').isIn(['users', 'tabs']),
            (0, express_validator_1.check)('url', 'La url es requerida').notEmpty(),
            (0, express_validator_1.check)('url', 'Url no valida').optional().isURL(),
            middlewares_1.validateField
        ]);
        this.uploadFile = () => ([
            // validateJWT,
            middlewares_1.validateFile,
            middlewares_1.validateExtensionFile,
        ]);
        this.deleteFile = () => ([
            middlewares_1.validateJWT,
            (0, express_validator_1.check)('url', 'La url es requerida').notEmpty(),
            (0, express_validator_1.check)('url', 'Url no valida').optional().isURL(),
            middlewares_1.validateField
        ]);
        // public uploadUserFile = () => ([
        //     // validateJWT,
        //     validateFile,
        //     validateExtensionImage,
        //     validateMongoId,
        //     check('id').custom(existUser),
        //     validateField
        // ])
        // public uploadProductFile = () => ([
        //     // validateJWT,
        //     validateFile,
        //     validateExtensionImage,
        //     validateMongoId,
        //     check('id').custom(existProduct),
        //     validateField
        // ])
        // public deleteUploadProductFile = () => ([
        //     // validateJWT,
        //     validateMongoId,
        //     check('id').custom(existProduct),
        //     check('url', 'La url es requerida').notEmpty(),
        //     check('url', 'Url no valida').optional().isURL(),
        //     validateField
        // ])
    }
}
exports.UploadValidate = UploadValidate;
