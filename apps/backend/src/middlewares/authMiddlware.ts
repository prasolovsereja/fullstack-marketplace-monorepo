import { verifyJwt } from "@/utils/verifyJwt";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "@/utils/HttpError";
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        next(new HttpError(401, "Token not provided"));
    }
    const token = authHeader!.split(' ')[1];
    const payload = await verifyJwt(token);
    if (!payload) {
        next(new HttpError(401, "Invalid JWT"));
    }
    req.body = payload;
    next();
}

