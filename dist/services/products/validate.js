"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidate = void 0;
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../../middlewares");
const db_validator_1 = require("../../helpers/db-validator");
class ProductValidate {
    constructor() {
        this.getProducts = () => ([
            (0, express_validator_1.check)('limit', 'El limit debe ser un valor numerico mayor a cero').optional().isInt({ min: 0 }),
            (0, express_validator_1.check)('page', 'El page debe ser un valor numerico mayor a uno').optional().isInt({ min: 1 }),
            middlewares_1.validateField
        ]);
        this.getProductById = () => ([
            middlewares_1.validateMongoId,
            (0, express_validator_1.check)('id').custom(db_validator_1.existProduct),
            middlewares_1.validateField
        ]);
        this.createProduct = () => ([
            middlewares_1.validateJWT,
            middlewares_1.validateAdminRole,
            (0, express_validator_1.check)('title', 'El titulo es requerido').notEmpty(),
            (0, express_validator_1.check)('title', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('title').custom(db_validator_1.productAlreadyExists),
            (0, express_validator_1.check)('description', 'La descripcion es requerida').notEmpty(),
            (0, express_validator_1.check)('description', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('category', 'La categoria es requerida').notEmpty(),
            (0, express_validator_1.check)('category', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('tags', 'Array no valido').optional().isArray(),
            (0, express_validator_1.check)('tags.*', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('images', 'Array no valido').optional().isArray(),
            (0, express_validator_1.check)('images.*', 'Url no valida').optional().isURL(),
            (0, express_validator_1.check)('pdf', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('tab', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('spotify', 'Url no valida').optional().isURL(),
            middlewares_1.validateField
        ]);
        this.updateProduct = () => ([
            middlewares_1.validateJWT,
            middlewares_1.validateAdminRole,
            middlewares_1.validateMongoId,
            (0, express_validator_1.check)('id').custom(db_validator_1.existProduct),
            (0, express_validator_1.check)('title', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('title').optional().custom(db_validator_1.productAlreadyExists),
            (0, express_validator_1.check)('description', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('category', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('tags', 'Array no valido').optional().isArray(),
            (0, express_validator_1.check)('tags.*', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('images', 'Array no valido').optional().isArray(),
            (0, express_validator_1.check)('images.*', 'Url no valida').optional().isURL(),
            (0, express_validator_1.check)('pdf', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('tab', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('spotify', 'Url no valida').optional().isURL(),
            middlewares_1.validateField
        ]);
        this.deleteProduct = () => ([
            middlewares_1.validateJWT,
            middlewares_1.validateAdminRole,
            middlewares_1.validateMongoId,
            (0, express_validator_1.check)('id').custom(db_validator_1.existProduct),
            middlewares_1.validateField
        ]);
    }
}
exports.ProductValidate = ProductValidate;
