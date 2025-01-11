import { Request, Response, NextFunction } from "express";

export const validateFile = (req: Request, res: Response, next: NextFunction) => {
    const { files } = req;
    if (!files || Object.keys(files).length === 0 || !files.file) {
        res.status(400).json([{ field: 'file', error: 'Debes enviar un archivo' }]);
        return;
    }
    next();
}