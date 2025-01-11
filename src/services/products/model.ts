import { model, Schema } from "mongoose";

const productSchema = new Schema({
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
    const { _id, ...product } = this.toObject();
    product.id = _id;
    return product;
}

export const Product = model('Product', productSchema);