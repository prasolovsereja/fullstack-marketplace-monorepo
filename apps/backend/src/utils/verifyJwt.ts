import jwt from 'jsonwebtoken';
import * as process from "node:process";

export const verifyJwt = async (token: string) => {
    return new Promise<{id: number, role: string}>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    })
};