import mongoose from "mongoose";

interface Options {
    mongoURL: string;
}

export class Mongo {
    static async connect({ mongoURL }: Options) {
        try {
            await mongoose.connect(mongoURL);
            console.log('Mongo connected!');
        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }
}