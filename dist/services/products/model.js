"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: new Date(),
    },
    title: {
        type: String,
        required: [true, 'title is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    price: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    images: {
        type: [String],
    },
    pdf: {
        type: String
    },
    tab: {
        type: String
    },
    spotify: {
        type: String
    }
}, { versionKey: false });
productSchema.methods.toJSON = function () {
    const _a = this.toObject(), { _id } = _a, product = __rest(_a, ["_id"]);
    product.id = _id;
    return product;
};
exports.Product = (0, mongoose_1.model)('Product', productSchema);
