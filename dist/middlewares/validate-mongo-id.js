"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMongoId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validateMongoId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json([{ field: 'id', error: 'ID no valido' }]);
    }
    next();
};
exports.validateMongoId = validateMongoId;
