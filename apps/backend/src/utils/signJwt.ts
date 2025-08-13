import jwt from 'jsonwebtoken';
import * as process from "node:process";

export const signJwt = (payload: object, expiresIn: '1h' | '7Day') => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: expiresIn});
}