import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: 'client',
        enum: ['admin', 'client']
    },
}, { versionKey: false });

// Extrae los campos que quieras y no los manda al cliente
userSchema.methods.toJSON = function () {
    const { _id, password, ...user } = this.toObject();
    user.id = _id;
    return user;
}

export const User = model('User', userSchema);