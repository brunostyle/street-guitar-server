import { Request, Response } from "express"
import { Order } from "./model";

export class OrderController {
    public getOrders = async (req: Request, res: Response) => {
        const limit = Number(req.query.limit ?? 10);
        const page = Number(req.query.page ?? 1);
        try {
            const [total, orders] = await Promise.all([
                Order.countDocuments(),
                Order.find()
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .populate({ path: 'user', select: { _id: 0, id: '$_id', name: 1, email: 1, avatar: 1 } })
                    .populate({ path: 'products', select: { _id: 0, id: '$_id', createdAt: 1, title: 1, description: 1, price: 1, tags: 1, category: 1, images: 1, pdf: 1, tab: 1, spotify: 1 } })
            ]);
            res.json({ page, limit, total, orders });
        } catch (error) {
            console.log(error);
        }
    }

    public getOrderById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const orderFind = await Order.findById(id)
                .populate({ path: 'user', select: { _id: 0, id: '$_id', name: 1, email: 1, avatar: 1 } })
                .populate({ path: 'products', select: { _id: 0, id: '$_id', createdAt: 1, title: 1, description: 1, price: 1, tags: 1, category: 1, images: 1, pdf: 1, tab: 1, spotify: 1 } })
            res.json(orderFind);
        } catch (error) {
            console.log(error);
        }
    }

    public createOrder = async (req: Request, res: Response) => {
        const { products } = req.body;
        const { _id } = req.userAuth;
        try {
            const newOrder = new Order({
                user: _id,
                paid: false,
                total: 0,
                items: products.length,
                products,
            });
            const orderAdded = await newOrder.save();
            res.json(orderAdded);
        } catch (error) {
            console.log(error);
        }
    }

    public updateOrder = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { paid, products } = req.body;
        try {
            const orderUpdated = await Order.findByIdAndUpdate(id, { paid, items: products.length, products }, { new: true });
            res.json(orderUpdated);
        } catch (error) {
            console.log(error);
        }
    }

    public deleteOrder = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const orderDeleted = await Order.findByIdAndDelete(id, { new: true });
            res.json(orderDeleted);
        } catch (error) {
            console.log(error);
        }
    }
}