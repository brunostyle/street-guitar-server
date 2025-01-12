import { Request, Response, NextFunction } from "express";

export const validateExtensionImage = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.files?.file as any;
    const allowExtensions = ['jpg', 'jpeg', 'png', 'jfif'];
    const extension = name.split('.').at(-1);
    if (!allowExtensions.includes(extension)) {
        return res.status(401).json([{ field: 'file', error: `La extension ${extension} no es valida, solo se permiten las extensiones ${allowExtensions}` }]);
    }
    next();
}

export const validateExtensionFile = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.files?.file as any;
    const extension = name.split('.').at(-1);
    if (extension !== 'pdf') {
        return res.status(401).json([{ field: 'file', error: `La extension ${extension} no es valida, solo se permiten las extension pdf` }]);
    }
    next();
}