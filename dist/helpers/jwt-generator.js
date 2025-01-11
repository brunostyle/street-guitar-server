"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id) => {
    try {
        return jsonwebtoken_1.default.sign({ id }, process.env.SECRET_WORD, { expiresIn: '6h' });
    }
    catch (error) {
        console.log(error);
    }
};
exports.generateJWT = generateJWT;
