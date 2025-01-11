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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productAlreadyExists = exports.existProduct = exports.existOrder = exports.emailAlreadyExists = exports.emailExists = exports.existUser = void 0;
const model_1 = require("../services/orders/model");
const model_2 = require("../services/products/model");
const model_3 = require("../services/users/model");
const existUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_3.User.findById(id);
    if (!user)
        throw new Error('El usuario no existe');
});
exports.existUser = existUser;
const emailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield model_3.User.findOne({ email });
    if (!userFound) {
        throw new Error('El email no coincide');
    }
});
exports.emailExists = emailExists;
const emailAlreadyExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyExists = yield model_3.User.findOne({ email });
    if (alreadyExists) {
        throw new Error('El email ya existe');
    }
});
exports.emailAlreadyExists = emailAlreadyExists;
// Order
const existOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield model_1.Order.findById(id);
    if (!order)
        throw new Error('La orden no existe');
});
exports.existOrder = existOrder;
// Product
const existProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield model_2.Product.findById(id);
    if (!product)
        throw new Error('El producto no existe');
});
exports.existProduct = existProduct;
const productAlreadyExists = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyExists = yield model_2.Product.findOne({ title });
    if (alreadyExists) {
        throw new Error('El producto ya existe');
    }
});
exports.productAlreadyExists = productAlreadyExists;
