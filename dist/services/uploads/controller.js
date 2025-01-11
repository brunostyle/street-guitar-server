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
exports.UploadController = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class UploadController {
    constructor() {
        this.uploadImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { collection } = req.params;
            try {
                const { tempFilePath } = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
                const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath, { folder: collection });
                res.json(secure_url);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.deleteImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { collection } = req.params;
            const { url } = req.body;
            try {
                const name = (_a = url.split('/').at(-1)) === null || _a === void 0 ? void 0 : _a.split('.').at(0);
                yield cloudinary_1.v2.uploader.destroy(`${collection}/${name}`);
                res.json('Imagen eliminada');
            }
            catch (error) {
                console.log(error);
            }
        });
        this.uploadFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { tempFilePath } = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
                const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath, { folder: 'tabs', resource_type: 'raw', format: 'pdf' });
                res.json(secure_url);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.deleteFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { url } = req.body;
            try {
                const name = url.split('/').at(-1);
                yield cloudinary_1.v2.uploader.destroy('tabs/' + name, { resource_type: 'raw' });
                res.json('Archivo eliminado');
            }
            catch (error) {
                console.log(error);
            }
        });
        // public uploadUserFile = async (req: Request, res: Response) => {
        //     const { id } = req.params;
        //     try {
        //         const user = await User.findById(id);
        //         if (user?.avatar) {
        //             const name = user.avatar.split('/').at(-1)?.split('.').at(0);
        //             await cloudinary.uploader.destroy('users/' + name);
        //         }
        //         const { tempFilePath } = req.files?.file as any;
        //         const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: 'users' });
        //         if (user) user.avatar = secure_url;
        //         const userSaved = await user?.save();
        //         res.json(userSaved);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // public uploadProductTab = async (req: Request, res: Response) => {
        //     const { id } = req.params;
        //     try {
        //         const product = await Product.findById(id);
        //         if (product?.pdf) {
        //             const name = product.pdf.split('/').at(-1);
        //             await cloudinary.uploader.destroy('tabs/' + name, { resource_type: 'raw' });
        //         }
        //         const { tempFilePath } = req.files?.file as any;
        //         const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: 'tabs', resource_type: 'raw', format: 'pdf' });
        //         if (product) product.pdf = secure_url;
        //         const productSaved = await product?.save();
        //         res.json(productSaved);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // public uploadProductImages = async (req: Request, res: Response) => {
        //     const { id } = req.params;
        //     try {
        //         const product = await Product.findById(id);
        //         const { tempFilePath } = req.files?.file as any;
        //         const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: 'images' });
        //         if (product) product.images.push(secure_url);
        //         const productSaved = await product?.save();
        //         res.json(productSaved);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // public deleteUploadProductFile = async (req: Request, res: Response) => {
        //     const { id } = req.params;
        //     const { url } = req.body;
        //     try {
        //         const product = await Product.findById(id);
        //         if (!product?.images.find(img => img === url)) {
        //             res.json([{ field: 'images', error: `La imagen del producto ${product?.title} no existe` }]);
        //             return;
        //         }
        //         const name = url.split('/').at(-1)?.split('.').at(0);
        //         await cloudinary.uploader.destroy('images/' + name);
        //         const newImages = product?.images.filter(img => img !== url);
        //         if (product) product.images = newImages!;
        //         const productSaved = await product?.save();
        //         res.json(productSaved);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    }
}
exports.UploadController = UploadController;
