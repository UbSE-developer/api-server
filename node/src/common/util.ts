import { HashingData } from '../model/type/response/common';
import crypto from 'crypto';

export const HashingToSalt = async (password: string) => {
    const salt = crypto.randomBytes(128).toString('base64');
    const iterations = 1;
    const hashed = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha512').toString('hex');
    const hashData: HashingData = {
        data: hashed,
        salt: salt,
    };

    return hashData;
}