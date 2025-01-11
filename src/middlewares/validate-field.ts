import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator"

export const validateField = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array().map((err: any) => ({ field: err.path, error: err.msg })));
        return;
    }
    next();
}