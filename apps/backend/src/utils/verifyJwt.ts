import jwt from 'jsonwebtoken';
import * as process from "node:process";
export interface JwtPayload {
    id: number;
    role: 'BUYER' | 'SELLER' | 'ADMIN';
    sessionId: number;
}
export const verifyJwt = async (token: string) => {
    return new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    })
};