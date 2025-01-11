import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

export const validateMongoId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json([{ field: 'id', error: 'ID no valido' }]);
    }
    next();
}