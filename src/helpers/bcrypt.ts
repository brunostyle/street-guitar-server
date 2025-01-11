import bcrypt from 'bcryptjs';

// Encripta las contraseñas
export const encryptPassword = async (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

//Desencripta la contraseña y la compara con otra
export const comparePassword = async (receivedPassword: string, password: string) => {
    return bcrypt.compareSync(receivedPassword, password);
}