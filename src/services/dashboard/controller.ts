import { Request, Response } from "express"
import { User } from "../users/model";
import { Product } from "../products/model";
import { Order } from "../orders/model";

export class DashboardController {
    public getStats = async (req: Request, res: Response) => {
        try {
            const [numberOfClients, numberOfProducts, numberOfOrders, lastSells] = await Promise.all([
                User.countDocuments(),
                Product.countDocuments(),
                Order.find().countDocuments(),
                Order.find()
                    .limit(10)
                    .select('id createdAt')
                    .populate('user', 'id name email avatar')
            ])
            const chart = {
                clients: [31, 40, 28, 51, 42, 109, 100],
                sells: [11, 32, 45, 32, 34, 52, 41]
            }
            res.json({ numberOfClients, numberOfProducts, numberOfOrders, lastSells, chart });
        } catch (error) {
            console.log(error);
        }
    }
}