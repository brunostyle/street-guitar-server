import { check } from "express-validator"
import { validateField, validateJWT, validateAdminRole, validateMongoId } from "../../middlewares"
import { existProduct, productAlreadyExists } from "../../helpers/db-validator"

export class ProductValidate {
    public getProducts = () => ([
        check('limit', 'El limit debe ser un valor numerico mayor a cero').optional().isInt({ min: 0 }),
        check('page', 'El page debe ser un valor numerico mayor a uno').optional().isInt({ min: 1 }),
        validateField
    ])

    public getProductById = () => ([
        validateMongoId,
        check('id').custom(existProduct),
        validateField
    ])

    public createProduct = () => ([
        validateJWT,
        validateAdminRole,
        check('title', 'El titulo es requerido').notEmpty(),
        check('title', 'String no valido').optional().isString(),
        check('title').custom(productAlreadyExists),
        check('description', 'La descripcion es requerida').notEmpty(),
        check('description', 'String no valido').optional().isString(),
        check('category', 'La categoria es requerida').notEmpty(),
        check('category', 'String no valido').optional().isString(),
        check('tags', 'Array no valido').optional().isArray(),
        check('tags.*', 'String no valido').optional().isString(),
        check('images', 'Array no valido').optional().isArray(),
        check('images.*', 'Url no valida').optional().isURL(),
        check('pdf', 'String no valido').optional().isString(),
        check('tab', 'String no valido').optional().isString(),
        check('spotify', 'Url no valida').optional().isURL(),
        validateField
    ])

    public updateProduct = () => ([
        validateJWT,
        validateAdminRole,
        validateMongoId,
        check('id').custom(existProduct),
        check('title', 'String no valido').optional().isString(),
        check('title').optional().custom(productAlreadyExists),
        check('description', 'String no valido').optional().isString(),
        check('category', 'String no valido').optional().isString(),
        check('tags', 'Array no valido').optional().isArray(),
        check('tags.*', 'String no valido').optional().isString(),
        check('images', 'Array no valido').optional().isArray(),
        check('images.*', 'Url no valida').optional().isURL(),
        check('pdf', 'String no valido').optional().isString(),
        check('tab', 'String no valido').optional().isString(),
        check('spotify', 'Url no valida').optional().isURL(),
        validateField
    ])

    public deleteProduct = () => ([
        validateJWT,
        validateAdminRole,
        validateMongoId,
        check('id').custom(existProduct),
        validateField
    ])
}