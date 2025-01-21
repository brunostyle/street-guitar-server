import mongoose from "mongoose";

export class Mongo {
    static async connect() {
        try {
            await mongoose.connect(process.env.MONGO_URL!);
            console.log('MongoDB connected');
        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }
}