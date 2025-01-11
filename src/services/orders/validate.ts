import { check } from "express-validator"
import { validateField, validateJWT, validateAdminRole, validateMongoId } from "../../middlewares"
import { existOrder, existProduct } from "../../helpers/db-validator"

export class OrderValidate {
    public getOrders = () => ([
        check('limit', 'El limit debe ser un valor numerico mayor a cero').optional().isInt({ min: 0 }),
        check('page', 'El page debe ser un valor numerico mayor a uno').optional().isInt({ min: 1 }),
        validateField
    ])

    public getOrderById = () => ([
        validateMongoId,
        check('id').custom(existOrder),
        validateField
    ])

    public createOrder = () => ([
        validateJWT,
        check('products', 'Los productos son requeridos').notEmpty(),
        check('products', 'Array no valido').optional().isArray(),
        check('products.*', 'ID no valido').optional().isMongoId(),
        check('products.*').optional().custom(existProduct),
        validateField
    ])

    public updateOrder = () => ([
        validateJWT,
        validateMongoId,
        check('id').custom(existOrder),
        check('paid', 'Booleano no valido').optional().isBoolean(),
        check('products', 'Array no valido').optional().isArray(),
        check('products.*', 'ID no valido').optional().isMongoId(),
        check('products.*').optional().custom(existProduct),
        validateField
    ])

    public deleteOrder = () => ([
        validateJWT,
        validateAdminRole,
        validateMongoId,
        check('id').custom(existOrder),
        validateField
    ])
}