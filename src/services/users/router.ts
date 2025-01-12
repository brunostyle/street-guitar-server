import { Router } from "express";
import { UserController } from "./controller";
import { UserValidate } from "./validate";

export class UserRoutes {
    static get routes() {
        const router = Router();
        const validate = new UserValidate();
        const controller = new UserController();

        router.get('/', validate.getUsers(), controller.getUsers);
        router.get('/:id', validate.getUserById(), controller.getUserById);
        router.post('/login', validate.loginUser(), controller.loginUser);
        router.post('/register', validate.registerUser(), controller.registerUser);
        router.put('/:id', validate.updateUser(), controller.updateUser);
        router.delete('/:id', validate.deleteUser(), controller.deleteUser);
        router.get('/auth/renew', validate.renewToken(), controller.renewToken)

        return router;
    }
}