"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFile = void 0;
const validateFile = (req, res, next) => {
    const { files } = req;
    if (!files || Object.keys(files).length === 0 || !files.file) {
        res.status(400).json([{ field: 'file', error: 'Debes enviar un archivo' }]);
        return;
    }
    next();
};
exports.validateFile = validateFile;
