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
    image: {
        type: String
    },
    thumbnail: {
        type: String
    },
    pdf: {
        type: String
    },
    tab: {
        type: String
    },
    spotify: {
        type: String
    },
    difficulty: {
        type: Number,
        required: [true, 'difficulty is required'],
        min: [1, 'The minimum difficulty is 1'],
        max: [5, 'The maximum difficulty is 5']
    },
    tuning: {
        label: {
            type: String,
            required: [true, 'El nombre de la afinación es obligatorio'],
            trim: true
        },
        notes: {
            first: { type: Number, required: true, min: 0, default: 4 },
            second: { type: Number, required: true, min: 0, default: 11 },
            third: { type: Number, required: true, min: 0, default: 7 },
            fourth: { type: Number, required: true, min: 0, default: 2 },
            fifth: { type: Number, required: true, min: 0, default: 9 },
            sixth: { type: Number, required: true, min: 0, default: 4 }
        }
    }
});

productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    }
})

export const Product = model('Product', productSchema);