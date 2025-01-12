import { Request, Response } from "express"
import { Product } from "./model";

export class ProductController {
    public getProducts = async (req: Request, res: Response) => {
        const limit = Number(req.query.limit ?? 10);
        const page = Number(req.query.page ?? 1);
        try {
            const [total, products] = await Promise.all([
                Product.countDocuments(),
                Product.find()
                    .limit(limit)
                    .skip((page - 1) * limit)
            ]);
            res.json({ page, limit, total, products });
        } catch (error) {
            console.log(error);
        }
    }

    public getProductById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const productFind = await Product.findById(id);
            res.json(productFind);
        } catch (error) {
            console.log(error);
        }
    }

    public getProductByCategory = async (req: Request, res: Response) => {
        const { category } = req.params;
        try {
            const products = await Product.find({ category });
            res.json(products);
        } catch (error) {
            console.log(error);
        }
    }

    public getProductByQuery = async (req: Request, res: Response) => {
        const { title } = req.params;
        try {
            const products = await Product.find({ title: { $regex: title, $options: 'i' } });
            res.json(products);
        } catch (error) {
            console.log(error);
        }
    }

    public createProduct = async (req: Request, res: Response) => {
        const { title, description, tags, category, images, pdf, tab, spotify } = req.body;
        try {
            const newProduct = new Product({ title, description, tags, category, images, pdf, tab, spotify });
            const productAdded = await newProduct.save();
            res.json(productAdded);
        } catch (error) {
            console.log(error);
        }
    }

    public updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const productUpdated = await Product.findByIdAndUpdate(id, data, { new: true });
            res.json(productUpdated);
        } catch (error) {
            console.log(error);
        }
    }

    public deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const productDeleted = await Product.findByIdAndDelete(id, { new: true });
            res.json(productDeleted);
        } catch (error) {
            console.log(error);
        }
    }
}