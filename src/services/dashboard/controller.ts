import { Request, Response } from "express"
import { User } from "../users/model";
import { Product } from "../products/model";
import { Order } from "../orders/model";

function groupBy<T, K>(array: T[], keySelector: (item: T) => K): Map<K, T[]> {
    return array.reduce((map, item) => {
        const key = keySelector(item);
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(item);
        return map;
    }, new Map<K, T[]>());
}

export class DashboardController {
    public getStats = async (req: Request, res: Response) => {
        try {
            const [numberOfClients, numberOfProducts, numberOfOrders, lastSells, sells] = await Promise.all([
                User.countDocuments(),
                Product.countDocuments(),
                Order.find().countDocuments(),
                Order.find()
                    .limit(10)
                    .select('id createdAt')
                    .populate('user', 'id name email avatar'),
                Order.find()
                    .select('createdAt items')
            ])
            const group = groupBy(sells, item => item.createdAt.toLocaleDateString('en-CA'));
            const chartData = [];
            for (const [time, values] of group.entries()) {
                chartData.push({ time, value: values.reduce((acc, act) => acc + act.items, 0) })
            }
            res.json({ numberOfClients, numberOfProducts, numberOfOrders, lastSells, chartData });
        } catch (error) {
            console.log(error);
        }
    }
}