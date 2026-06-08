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

    public getProductByCategory = () => ([
        check('category', 'La categoria es requerida').notEmpty(),
        check('category', 'Categoria no valida').optional().isIn(['rock', 'pop', 'folclore', 'cumbia', 'romantico', 'otros']),
        validateField
    ])

    public getProductByDifficulty = () => ([
        check('difficulty', 'La dificultad es requerida').notEmpty(),
        check('difficulty', 'Dificultad no valida').optional().isInt(),
        validateField
    ])

    public getProductByQuery = () => ([
        check('title', 'El titulo es requerido').notEmpty(),
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
        check('image', 'String no valido').optional().isString(),
        check('thumbnail', 'String no valido').optional().isString(),
        check('pdf', 'String no valido').optional().isString(),
        check('tab', 'String no valido').optional().isString(),
        check('spotify', 'Url no valida').optional().isURL(),
        check('difficulty', 'La dificultad es requerida').notEmpty(),
        check('difficulty', 'La dificultad debe ser un numero').optional().isNumeric(),
        check('difficulty', 'La dificultad debe ser un número entre 1 y 5').optional().isInt({ min: 1, max: 5 }),
        check('tuning', 'Los datos de afinación son requeridos').notEmpty(),
        check('tuning', 'Datos de afinación no validos').optional().isObject(),
        check('tuning.label', 'El nombre de la afinación es obligatorio').notEmpty(),
        check('tuning.label', 'Nombre de la afinación no valido').optional().isString().trim(),
        check('tuning.notes', 'Las notas de la afinación son requeridas').notEmpty(),
        check('tuning.notes', 'Notas de la afinación no validas').optional().isObject(),
        check('tuning.notes.first', 'La primera cuerda es requerida').notEmpty(),
        check('tuning.notes.first', 'Primera cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        check('tuning.notes.second', 'La segunda cuerda es requerida').notEmpty(),
        check('tuning.notes.second', 'Segunda cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        check('tuning.notes.third', 'La tercera cuerda es requerida').notEmpty(),
        check('tuning.notes.third', 'Tercera cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        check('tuning.notes.fourth', 'La cuarta cuerda es requerida').notEmpty(),
        check('tuning.notes.fourth', 'Cuarta cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        check('tuning.notes.fifth', 'La quinta cuerda es requerida').notEmpty(),
        check('tuning.notes.fifth', 'Quinta cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        check('tuning.notes.sixth', 'La sexta cuerda es requerida').notEmpty(),
        check('tuning.notes.sixth', 'Sexta cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        validateField
    ])

    public updateProduct = () => ([
        validateJWT,
        validateAdminRole,
        validateMongoId,
        check('id').custom(existProduct),
        check('title', 'String no valido').optional().isString(),
        check('description', 'String no valido').optional().isString(),
        check('category', 'String no valido').optional().isString(),
        check('tags', 'Array no valido').optional().isArray(),
        check('tags.*', 'String no valido').optional().isString(),
        check('image', 'String no valido').optional().isString(),
        check('thumbnail', 'String no valido').optional().isString(),
        check('pdf', 'String no valido').optional().isString(),
        check('tab', 'String no valido').optional().isString(),
        check('spotify', 'Url no valida').optional().isURL(),
        check('difficulty', 'La dificultad debe ser un numero').optional().isNumeric(),
        check('difficulty', 'La dificultad debe ser un número entre 1 y 5').optional().isInt({ min: 1, max: 5 }),
        check('tuning', 'Datos de afinación no validos').optional().isObject(),
        check('tuning.label', 'Nombre de la afinación no valido').optional().isString().trim(),
        check('tuning.notes', 'Notas de la afinación no validas').optional().isObject(),
        check('tuning.notes.first', 'Primera cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        check('tuning.notes.second', 'Segunda cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        check('tuning.notes.third', 'Tercera cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        check('tuning.notes.fourth', 'Cuarta cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        check('tuning.notes.fifth', 'Quinta cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
        check('tuning.notes.sixth', 'Sexta cuerda no valida').optional().isNumeric().isInt({ min: 0 }),
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