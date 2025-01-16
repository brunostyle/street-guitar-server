import jwt from 'jsonwebtoken';

export const generateJWT = (id: string) => {
    try {
        return jwt.sign({ id }, process.env.SECRET_WORD!);
    } catch (error) {
        console.log(error);
    }
}