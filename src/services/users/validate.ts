import { check } from "express-validator"
import { validateField, validateJWT, validateAdminRole, validateMongoId } from "../../middlewares"
import { emailAlreadyExists, emailExists, existUser } from "../../helpers/db-validator"

export class UserValidate {
    public getUsers = () => ([
        check('limit', 'El limit debe ser un valor numerico mayor a cero').optional().isInt({ min: 0 }),
        check('page', 'El page debe ser un valor numerico mayor a uno').optional().isInt({ min: 1 }),
        validateField
    ])

    public getUserById = () => ([
        validateMongoId,
        check('id').custom(existUser),
        validateField
    ])

    public loginUser = () => ([
        check('email', 'El email es requerido').notEmpty(),
        check('email', 'Email no valido').optional().isEmail(),
        check('email').optional().custom(emailExists),
        check('password', 'La contraseña es requerida').notEmpty(),
        validateField
    ])

    public registerUser = () => ([
        check('name', 'El nombre es requerido').notEmpty(),
        check('name', 'String no valido').optional().isString(),
        check('email', 'El email es requerido').notEmpty(),
        check('email', 'Email no valido').optional().isEmail(),
        check('email').custom(emailAlreadyExists),
        check('password', 'La contraseña es requerida').notEmpty(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').optional().isLength({ min: 6 }),
        check('avatar', 'Url no valida').optional().isURL(),
        check('role', 'Rol no valido').optional().isIn(['admin', 'client']),
        validateField
    ])

    public updateUser = () => ([
        validateJWT,
        validateMongoId,
        check('id').custom(existUser),
        check('name', 'String no valido').optional().isString(),
        check('email', 'Email no valido').optional().isEmail(),
        check('email').optional().custom(emailAlreadyExists),
        check('password', 'la contraseña debe tener al menos 6 caracteres').optional().isLength({ min: 6 }),
        check('avatar', 'Url no valida').optional().isURL(),
        check('role', 'Rol no valido').optional().isIn(['admin', 'client']),
        validateField
    ])

    public deleteUser = () => ([
        validateJWT,
        validateAdminRole,
        validateMongoId,
        check('id').custom(existUser),
        validateField
    ])

    public renewToken = () => ([
        validateJWT
    ])
}