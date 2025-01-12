import { check } from "express-validator";
import { validateExtensionImage, validateExtensionFile, validateField, validateFile, validateJWT } from "../../middlewares";

export class UploadValidate {
    public uploadImage = () => ([
        validateJWT,
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
        validateJWT,
        validateFile,
        validateExtensionFile,
    ])

    public deleteFile = () => ([
        validateJWT,
        check('url', 'La url es requerida').notEmpty(),
        check('url', 'Url no valida').optional().isURL(),
        validateField
    ])
}