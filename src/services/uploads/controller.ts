import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from 'cloudinary';
import { supabase } from "../../database/storage";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export class UploadController {
    public uploadFile = async (req: Request, res: Response) => {
        const { collection } = req.params;
        try {
            const file = req.files?.file as any;
            const contentType = collection === 'tabs' ? 'application/pdf' : 'image/jpeg';
            const { data } = await supabase.storage.from(collection).upload(uuid(), file.data,
                { cacheControl: '3600', upsert: false, contentType }
            );
            const { data: { publicUrl } } = supabase.storage.from(collection).getPublicUrl(data?.path!);
            res.json(publicUrl);
        } catch (error) {
            console.log(error);
        }
    }

    public deleteFile = async (req: Request, res: Response) => {
        const { collection } = req.params;
        const { url } = req.body;
        try {
            const fileName = url.split('/').at(-1);
            await supabase.storage.from(collection).remove([fileName])
            res.json('Achivo eliminada');
        } catch (error) {
            console.log(error);
        }
    }
    // public uploadFile = async (req: Request, res: Response) => {
    //     const { collection } = req.params;
    //     try {
    //         const { tempFilePath } = req.files?.file as any;
    //         const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: collection, format: 'jpg' });
    //         res.json(secure_url);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // public deleteFile = async (req: Request, res: Response) => {
    //     const { collection } = req.params;
    //     const { url } = req.body;
    //     try {
    //         const name = url.split('/').at(-1)?.split('.').at(0);
    //         await cloudinary.uploader.destroy(`${collection}/${name}`);
    //         res.json('Imagen eliminada');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}