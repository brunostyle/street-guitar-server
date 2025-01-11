import { Request, Response } from "express"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export class UploadController {
    public uploadImage = async (req: Request, res: Response) => {
        const { collection } = req.params;
        try {
            const { tempFilePath } = req.files?.file as any;
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: collection });
            res.json(secure_url);
        } catch (error) {
            console.log(error);
        }
    }

    public deleteImage = async (req: Request, res: Response) => {
        const { collection } = req.params;
        const { url } = req.body;
        try {
            const name = url.split('/').at(-1)?.split('.').at(0);
            await cloudinary.uploader.destroy(`${collection}/${name}`);
            res.json('Imagen eliminada');
        } catch (error) {
            console.log(error);
        }
    }

    public uploadFile = async (req: Request, res: Response) => {
        try {
            const { tempFilePath } = req.files?.file as any;
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: 'tabs', resource_type: 'raw', format: 'pdf' });
            res.json(secure_url);
        } catch (error) {
            console.log(error);
        }
    }

    public deleteFile = async (req: Request, res: Response) => {
        const { url } = req.body;
        try {
            const name = url.split('/').at(-1);
            await cloudinary.uploader.destroy('tabs/' + name, { resource_type: 'raw' });
            res.json('Archivo eliminado');
        } catch (error) {
            console.log(error);
        }
    }















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