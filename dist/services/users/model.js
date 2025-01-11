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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
    const _a = this.toObject(), { _id, password } = _a, user = __rest(_a, ["_id", "password"]);
    user.id = _id;
    return user;
};
exports.User = (0, mongoose_1.model)('User', userSchema);
