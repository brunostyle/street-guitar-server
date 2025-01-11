import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    createdAt: {
        type: Date,
        default: new Date(),
    },
    user: {
        type: Schema.Types.ObjectId,
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
        type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        required: [true, 'products is required']
    }
}, { versionKey: false });

orderSchema.methods.toJSON = function () {
    const { _id, ...order } = this.toObject();
    order.id = _id;
    return order;
}

export const Order = model('Order', orderSchema);