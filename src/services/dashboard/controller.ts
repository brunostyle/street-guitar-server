import { Request, Response } from "express"
import { User } from "../users/model";
import { Product } from "../products/model";
import { Order } from "../orders/model";
import { supabase } from "../../database/storage";

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
                    .populate('user', 'id name email avatar')
                    .sort({ createdAt: -1 }),
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

    public keepAlive = async (req: Request, res: Response) => {
        try {
            const { error } = await supabase.from('users').select('id').limit(1);
            if (error) throw error;
            res.json('Ping a Supabase exitoso 🚀');
        } catch (error) {
            console.log(error);
        }
    }
}