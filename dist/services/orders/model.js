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
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: new Date(),
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    paid: {
        type: Boolean,
        default: false,
    },
    total: {
        type: Number,
        default: 0,
    },
    items: {
        type: Number,
        default: 0,
    },
    products: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }],
        required: [true, 'products is required']
    }
}, { versionKey: false });
orderSchema.methods.toJSON = function () {
    const _a = this.toObject(), { _id } = _a, order = __rest(_a, ["_id"]);
    order.id = _id;
    return order;
};
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
