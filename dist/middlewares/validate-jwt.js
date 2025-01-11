"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../services/users/model");
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('access-token');
    if (!token)
        return res.status(401).json([{ field: 'token', error: 'No has enviado el token de acceso' }]);
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_WORD);
        const { id } = payload;
        const user = yield model_1.User.findById(id);
        if (!user)
            return res.status(400).json([{ field: 'user', error: 'El usuario no existe en la base de datos' }]);
        req.body.userAuth = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json([{ field: 'token', error: 'Token no valido' }]);
    }
});
exports.validateJWT = validateJWT;
