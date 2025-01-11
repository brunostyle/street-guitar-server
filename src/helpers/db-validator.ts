import { Order } from "../services/orders/model";
import { Product } from "../services/products/model";
import { User } from "../services/users/model";

export const existUser = async (id: string) => {
    const user = await User.findById(id);
    if (!user) throw new Error('El usuario no existe');
}

export const emailExists = async (email: string) => {
    const userFound = await User.findOne({ email });
    if (!userFound) {
        throw new Error('El email no coincide');
    }
}

export const emailAlreadyExists = async (email: string) => {
    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
        throw new Error('El email ya existe');
    }
}

// Order
export const existOrder = async (id: string) => {
    const order = await Order.findById(id);
    if (!order) throw new Error('La orden no existe');
}

// Product
export const existProduct = async (id: string) => {
    const product = await Product.findById(id);
    if (!product) throw new Error('El producto no existe');
}

export const productAlreadyExists = async (title: string) => {
    const alreadyExists = await Product.findOne({ title });
    if (alreadyExists) {
        throw new Error('El producto ya existe');
    }
}