import { verifyJwt } from "@/utils/verifyJwt";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "@/utils/HttpError";

export const refreshMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        next(new HttpError(401, "Token not provided"));
    }
    const payload = await verifyJwt(refreshToken);
    if (!payload) {
        next(new HttpError(401, "Invalid refresh token"));
    }
    req.user = {...payload, refreshToken};
    next();
}