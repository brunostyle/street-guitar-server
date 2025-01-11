"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const validate_1 = require("./validate");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const validate = new validate_1.UserValidate();
        const controller = new controller_1.UserController();
        router.get('/', validate.getUsers(), controller.getUsers);
        router.get('/:id', validate.getUserById(), controller.getUserById);
        router.post('/login', validate.loginUser(), controller.loginUser);
        router.post('/register', validate.registerUser(), controller.registerUser);
        router.put('/:id', validate.updateUser(), controller.updateUser);
        router.delete('/:id', validate.deleteUser(), controller.deleteUser);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
