import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { supabase } from "../../database/storage";

export class UploadController {
    public uploadFile = async (req: Request, res: Response) => {
        const { collection } = req.params;
        try {
            const file = req.files?.file as any;
            const contentType = collection === 'tabs' ? 'application/pdf' : 'image/jpeg';
            const { data, error } = await supabase.storage.from(collection).upload(uuid(), file.data,
                { cacheControl: '3600', upsert: false, contentType }
            );
            if (error) res.status(401).json(error);
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
}