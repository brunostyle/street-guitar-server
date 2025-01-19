import { Request, Response } from "express"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export class UploadController {
    public uploadFile = async (req: Request, res: Response) => {
        const { collection } = req.params;
        try {
            const { tempFilePath } = req.files?.file as any;
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: collection });
            res.json(secure_url);
        } catch (error) {
            console.log(error);
        }
    }

    public deleteFile = async (req: Request, res: Response) => {
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
}