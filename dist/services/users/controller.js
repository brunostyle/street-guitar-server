"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const model_1 = require("./model");
const bcrypt_1 = require("../../helpers/bcrypt");
const jwt_generator_1 = require("../../helpers/jwt-generator");
class UserController {
    constructor() {
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const limit = Number((_a = req.query.limit) !== null && _a !== void 0 ? _a : 10);
            const page = Number((_b = req.query.page) !== null && _b !== void 0 ? _b : 1);
            try {
                const [total, users] = yield Promise.all([
                    model_1.User.countDocuments(),
                    model_1.User.find()
                        .limit(limit)
                        .skip((page - 1) * limit)
                ]);
                res.json({ page, limit, total, users });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const userFind = yield model_1.User.findById(id);
                res.json(userFind);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const userFound = yield model_1.User.findOne({ email });
                //Verifica la contraseña
                const passwordMatch = yield (0, bcrypt_1.comparePassword)(password, userFound === null || userFound === void 0 ? void 0 : userFound.password);
                if (!passwordMatch) {
                    res.status(400).json(['Contraseña incorrecta']);
                    return;
                }
                //Genera un JWT
                const token = (0, jwt_generator_1.generateJWT)(userFound === null || userFound === void 0 ? void 0 : userFound.id);
                res.json({ userFound, token });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                data.password = yield (0, bcrypt_1.encryptPassword)(data.password);
                const newUser = new model_1.User(data);
                const userAdded = yield newUser.save();
                res.json(userAdded);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            try {
                if (data.password) {
                    data.password = yield (0, bcrypt_1.encryptPassword)(data.password);
                }
                const userUpdated = yield model_1.User.findByIdAndUpdate(id, data, { new: true });
                res.json(userUpdated);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const userDeleted = yield model_1.User.findByIdAndDelete(id, { new: true });
                res.json(userDeleted);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.UserController = UserController;
