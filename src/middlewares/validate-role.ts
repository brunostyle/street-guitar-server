import { Request, Response, NextFunction } from "express";

export const validateAdminRole = (req: Request, res: Response, next: NextFunction) => {
    if (!(req as any).userAuth) return res.status(500).json([{ field: 'token', error: 'Se quiere verificar el rol si validar el token' }]);
    const { name, role } = (req as any).userAuth;
    if (role !== 'admin') return res.status(401).json([{ field: 'role', error: `${name} no tiene permisos de administrador` }]);
    next();
}