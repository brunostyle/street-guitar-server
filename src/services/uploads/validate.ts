import { check } from "express-validator";
import { validateExtensionImage, validateExtensionFile, validateField, validateFile, validateJWT } from "../../middlewares";

export class UploadValidate {
    public uploadImage = () => ([
        // validateJWT,
        validateFile,
        validateExtensionImage,
        check('collection', 'Coleccion no valida').isIn(['users', 'products', 'tabs']),
        validateField
    ])

    public deleteImage = () => ([
        validateJWT,
        check('collection', 'Coleccion no valida').isIn(['users', 'products', 'tabs']),
        check('url', 'La url es requerida').notEmpty(),
        check('url', 'Url no valida').optional().isURL(),
        validateField
    ])

    public uploadFile = () => ([
        // validateJWT,
        validateFile,
        validateExtensionFile,
    ])

    public deleteFile = () => ([
        validateJWT,
        check('url', 'La url es requerida').notEmpty(),
        check('url', 'Url no valida').optional().isURL(),
        validateField
    ])




















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