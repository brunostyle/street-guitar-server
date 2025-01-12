import { Request, Response } from "express"
import { User } from "./model";
import { comparePassword, encryptPassword } from "../../helpers/bcrypt";
import { generateJWT } from "../../helpers/jwt-generator";

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        const limit = Number(req.query.limit ?? 10);
        const page = Number(req.query.page ?? 1);
        try {
            const [total, users] = await Promise.all([
                User.countDocuments(),
                User.find()
                    .limit(limit)
                    .skip((page - 1) * limit)
            ]);
            res.json({ page, limit, total, users });
        } catch (error) {
            console.log(error);
        }
    }

    public getUserById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const userFind = await User.findById(id);
            res.json(userFind);
        } catch (error) {
            console.log(error);
        }
    }

    public loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            //Verifica la contraseña
            const passwordMatch = await comparePassword(password, user?.password!);
            if (!passwordMatch) {
                res.status(400).json([{ field: 'password', error: 'Contraseña incorrecta' }]);
                return;
            }
            //Genera un JWT
            const token = generateJWT(user?.id);
            res.json({ user, token });
        } catch (error) {
            console.log(error);
        }
    }

    public registerUser = async (req: Request, res: Response) => {
        const data = req.body;
        try {
            data.password = await encryptPassword(data.password!);
            const newUser = new User(data);
            const user = await newUser.save();
            //Genera un JWT
            const token = generateJWT(user?.id);
            res.json({ user, token });
        } catch (error) {
            console.log(error);
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        try {
            if (data.password) {
                data.password = await encryptPassword(data.password!);
            }
            const userUpdated = await User.findByIdAndUpdate(id, data, { new: true });
            res.json(userUpdated);
        } catch (error) {
            console.log(error);
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const userDeleted = await User.findByIdAndDelete(id, { new: true });
            res.json(userDeleted);
        } catch (error) {
            console.log(error);
        }
    }

    public renewToken = async (req: Request, res: Response) => {
        const { _id, name, email, role, avatar } = (req as any).userAuth;
        try {
            const token = await generateJWT(_id);
            res.json({ user: { id: _id, name, email, role, avatar }, token })
        } catch (error) {
            console.log(error);
        }
    }
}