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
exports.validateExtensionFile = exports.validateExtensionImage = void 0;
const validateExtensionImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    const allowExtensions = ['jpg', 'jpeg', 'png', 'jfif'];
    const extension = name.split('.').at(-1);
    if (!allowExtensions.includes(extension)) {
        res.json([{ field: 'file', error: `La extension ${extension} no es valida, solo se permiten las extensiones ${allowExtensions}` }]);
        return;
    }
    next();
});
exports.validateExtensionImage = validateExtensionImage;
const validateExtensionFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    const extension = name.split('.').at(-1);
    if (extension !== 'pdf') {
        res.json([{ field: 'file', error: `La extension ${extension} no es valida, solo se permiten las extension pdf` }]);
        return;
    }
    next();
});
exports.validateExtensionFile = validateExtensionFile;
