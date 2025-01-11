import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../services/users/model";

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('access-token');
    if (!token) return res.status(401).json([{ field: 'token', error: 'No has enviado el token de acceso' }]);
    try {
        const payload = jwt.verify(token, process.env.SECRET_WORD!);
        const { id } = payload as { id: string }
        const user = await User.findById(id);
        if (!user) return res.status(400).json([{ field: 'user', error: 'El usuario no existe en la base de datos' }]);
        req.body.userAuth = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json([{ field: 'token', error: 'Token no valido' }]);
    }
}