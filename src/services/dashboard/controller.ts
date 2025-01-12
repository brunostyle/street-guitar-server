import { Request, Response } from "express"
import { User } from "../users/model";
import { Product } from "../products/model";
import { Order } from "../orders/model";

export class DashboardController {
    public getStats = async (req: Request, res: Response) => {
        try {
            const [numbersOfClients, numbersOfProducts, numbersOfOrders, lastSells] = await Promise.all([
                User.countDocuments(),
                Product.countDocuments(),
                Order.find().countDocuments(),
                Order.find()
                    .limit(10)
                    .select('_id createdAt')
                    .populate({ path: 'user', select: { _id: 0, name: 1, email: 1, avatar: 1 } })
            ])
            const chart = {
                clients: [31, 40, 28, 51, 42, 109, 100],
                sells: [11, 32, 45, 32, 34, 52, 41]
            }
            res.json({ numbersOfClients, numbersOfProducts, numbersOfOrders, lastSells, chart });
        } catch (error) {
            console.log(error);
        }
    }
}