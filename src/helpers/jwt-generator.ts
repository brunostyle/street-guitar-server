import jwt from 'jsonwebtoken';

export const generateJWT = (id: string) => {
    try {
        return jwt.sign({ id }, process.env.SECRET_WORD!, { expiresIn: '6h' });
    } catch (error) {
        console.log(error);
    }
}