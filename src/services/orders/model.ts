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
});

orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    }
})

export const Order = model('Order', orderSchema);