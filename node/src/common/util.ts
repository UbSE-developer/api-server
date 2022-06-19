import { HashingData } from '../model/type/response/common';
import crypto from 'crypto';

export const HashingToSalt = async (password: string, salt?: string) => {
    const saltData = typeof salt === 'undefined' ? crypto.randomBytes(128).toString('base64') : salt;
    const iterations = 1;
    const hashed = crypto.pbkdf2Sync(password, saltData, iterations, 32, 'sha512').toString('hex');
    const hashData: HashingData = {
        data: hashed,
        salt: saltData,
    };

    return hashData;
}

export const IsNull = async (data: any) => {
    if (data === '' || data === null || typeof data === 'undefined') {
        return false;
    }
    return true;
}