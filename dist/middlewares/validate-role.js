"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminRole = void 0;
const validateAdminRole = (req, res, next) => {
    if (!req.body.userAuth)
        return res.status(500).json([{ field: 'token', error: 'Se quiere verificar el rol si validar el token' }]);
    const { name, role } = req.body.userAuth;
    if (role !== 'admin')
        return res.status(401).json([{ field: 'role', error: `${name} no tiene permisos de administrador` }]);
    next();
};
exports.validateAdminRole = validateAdminRole;
