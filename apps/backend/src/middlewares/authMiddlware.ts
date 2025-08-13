import { verifyJwt } from "@/utils/verifyJwt";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "@/utils/HttpError";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies?.accessToken || (authHeader && authHeader.split(' ')[1]);
    console.log(token);
    if (!token) {
        next(new HttpError(401, "Token not provided"));
    }
    const payload = await verifyJwt(token);
    if (!payload) {
        next(new HttpError(401, "Invalid JWT"));
    }
    req.user = payload;
    next();
}

