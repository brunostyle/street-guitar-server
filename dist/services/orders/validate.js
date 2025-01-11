"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidate = void 0;
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../../middlewares");
const db_validator_1 = require("../../helpers/db-validator");
class OrderValidate {
    constructor() {
        this.getOrders = () => ([
            (0, express_validator_1.check)('limit', 'El limit debe ser un valor numerico mayor a cero').optional().isInt({ min: 0 }),
            (0, express_validator_1.check)('page', 'El page debe ser un valor numerico mayor a uno').optional().isInt({ min: 1 }),
            middlewares_1.validateField
        ]);
        this.getOrderById = () => ([
            middlewares_1.validateMongoId,
            (0, express_validator_1.check)('id').custom(db_validator_1.existOrder),
            middlewares_1.validateField
        ]);
        this.createOrder = () => ([
            middlewares_1.validateJWT,
            (0, express_validator_1.check)('products', 'Los productos son requeridos').notEmpty(),
            (0, express_validator_1.check)('products', 'Array no valido').optional().isArray(),
            (0, express_validator_1.check)('products.*', 'ID no valido').optional().isMongoId(),
            (0, express_validator_1.check)('products.*').optional().custom(db_validator_1.existProduct),
            middlewares_1.validateField
        ]);
        this.updateOrder = () => ([
            middlewares_1.validateJWT,
            middlewares_1.validateMongoId,
            (0, express_validator_1.check)('id').custom(db_validator_1.existOrder),
            (0, express_validator_1.check)('paid', 'Booleano no valido').optional().isBoolean(),
            (0, express_validator_1.check)('products', 'Array no valido').optional().isArray(),
            (0, express_validator_1.check)('products.*', 'ID no valido').optional().isMongoId(),
            (0, express_validator_1.check)('products.*').optional().custom(db_validator_1.existProduct),
            middlewares_1.validateField
        ]);
        this.deleteOrder = () => ([
            middlewares_1.validateJWT,
            middlewares_1.validateAdminRole,
            middlewares_1.validateMongoId,
            (0, express_validator_1.check)('id').custom(db_validator_1.existOrder),
            middlewares_1.validateField
        ]);
    }
}
exports.OrderValidate = OrderValidate;
