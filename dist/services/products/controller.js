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
exports.ProductController = void 0;
const model_1 = require("./model");
class ProductController {
    constructor() {
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const limit = Number((_a = req.query.limit) !== null && _a !== void 0 ? _a : 10);
            const page = Number((_b = req.query.page) !== null && _b !== void 0 ? _b : 1);
            try {
                const [total, products] = yield Promise.all([
                    model_1.Product.countDocuments(),
                    model_1.Product.find()
                        .limit(limit)
                        .skip((page - 1) * limit)
                ]);
                res.json({ page, limit, total, products });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const productFind = yield model_1.Product.findById(id);
                res.json(productFind);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, description, tags, category, images, pdf, tab, spotify } = req.body;
            try {
                const newProduct = new model_1.Product({ title, description, tags, category, images, pdf, tab, spotify });
                const productAdded = yield newProduct.save();
                res.json(productAdded);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            try {
                const productUpdated = yield model_1.Product.findByIdAndUpdate(id, data, { new: true });
                res.json(productUpdated);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const productDeleted = yield model_1.Product.findByIdAndDelete(id, { new: true });
                res.json(productDeleted);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.ProductController = ProductController;
