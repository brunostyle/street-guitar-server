"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidate = void 0;
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../../middlewares");
const db_validator_1 = require("../../helpers/db-validator");
class UserValidate {
    constructor() {
        this.getUsers = () => ([
            (0, express_validator_1.check)('limit', 'El limit debe ser un valor numerico mayor a cero').optional().isInt({ min: 0 }),
            (0, express_validator_1.check)('page', 'El page debe ser un valor numerico mayor a uno').optional().isInt({ min: 1 }),
            middlewares_1.validateField
        ]);
        this.getUserById = () => ([
            middlewares_1.validateMongoId,
            (0, express_validator_1.check)('id').custom(db_validator_1.existUser),
            middlewares_1.validateField
        ]);
        this.loginUser = () => ([
            (0, express_validator_1.check)('email', 'El email es requerido').notEmpty(),
            (0, express_validator_1.check)('email', 'Email no valido').optional().isEmail(),
            (0, express_validator_1.check)('email').optional().custom(db_validator_1.emailExists),
            (0, express_validator_1.check)('password', 'La contraseña es requerida').notEmpty(),
            middlewares_1.validateField
        ]);
        this.registerUser = () => ([
            (0, express_validator_1.check)('name', 'El nombre es requerido').notEmpty(),
            (0, express_validator_1.check)('name', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('email', 'El email es requerido').notEmpty(),
            (0, express_validator_1.check)('email', 'Email no valido').optional().isEmail(),
            (0, express_validator_1.check)('email').custom(db_validator_1.emailAlreadyExists),
            (0, express_validator_1.check)('password', 'La contraseña es requerida').notEmpty(),
            (0, express_validator_1.check)('password', 'La contraseña debe tener al menos 6 caracteres').optional().isLength({ min: 6 }),
            (0, express_validator_1.check)('avatar', 'Url no valida').optional().isURL(),
            (0, express_validator_1.check)('role', 'Rol no valido').optional().isIn(['admin', 'client']),
            middlewares_1.validateField
        ]);
        this.updateUser = () => ([
            middlewares_1.validateJWT,
            middlewares_1.validateMongoId,
            (0, express_validator_1.check)('id').custom(db_validator_1.existUser),
            (0, express_validator_1.check)('name', 'String no valido').optional().isString(),
            (0, express_validator_1.check)('email', 'Email no valido').optional().isEmail(),
            (0, express_validator_1.check)('email').optional().custom(db_validator_1.emailAlreadyExists),
            (0, express_validator_1.check)('password', 'la contraseña debe tener al menos 6 caracteres').optional().isLength({ min: 6 }),
            (0, express_validator_1.check)('avatar', 'Url no valida').optional().isURL(),
            (0, express_validator_1.check)('role', 'Rol no valido').optional().isIn(['admin', 'client']),
            middlewares_1.validateField
        ]);
        this.deleteUser = () => ([
            middlewares_1.validateJWT,
            middlewares_1.validateAdminRole,
            middlewares_1.validateMongoId,
            (0, express_validator_1.check)('id').custom(db_validator_1.existUser),
            middlewares_1.validateField
        ]);
    }
}
exports.UserValidate = UserValidate;
