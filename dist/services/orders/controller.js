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
exports.OrderController = void 0;
const model_1 = require("./model");
class OrderController {
    constructor() {
        this.getOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const limit = Number((_a = req.query.limit) !== null && _a !== void 0 ? _a : 10);
            const page = Number((_b = req.query.page) !== null && _b !== void 0 ? _b : 1);
            try {
                const [total, orders] = yield Promise.all([
                    model_1.Order.countDocuments(),
                    model_1.Order.find()
                        .limit(limit)
                        .skip((page - 1) * limit)
                        .populate({ path: 'user', select: { _id: 0, id: '$_id', name: 1, email: 1, avatar: 1 } })
                        .populate({ path: 'products', select: { _id: 0, id: '$_id', createdAt: 1, title: 1, description: 1, price: 1, tags: 1, category: 1, images: 1, pdf: 1, tab: 1, spotify: 1 } })
                ]);
                res.json({ page, limit, total, orders });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const orderFind = yield model_1.Order.findById(id)
                    .populate({ path: 'user', select: { _id: 0, id: '$_id', name: 1, email: 1, avatar: 1 } })
                    .populate({ path: 'products', select: { _id: 0, id: '$_id', createdAt: 1, title: 1, description: 1, price: 1, tags: 1, category: 1, images: 1, pdf: 1, tab: 1, spotify: 1 } });
                res.json(orderFind);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userAuth, products } = req.body;
            try {
                const newOrder = new model_1.Order({
                    user: userAuth.id,
                    paid: false,
                    total: 0,
                    items: products.length,
                    products,
                });
                const orderAdded = yield newOrder.save();
                res.json(orderAdded);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.updateOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { paid, products } = req.body;
            try {
                const orderUpdated = yield model_1.Order.findByIdAndUpdate(id, { paid, items: products.length, products }, { new: true });
                res.json(orderUpdated);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.deleteOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const orderDeleted = yield model_1.Order.findByIdAndDelete(id, { new: true });
                res.json(orderDeleted);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.OrderController = OrderController;
