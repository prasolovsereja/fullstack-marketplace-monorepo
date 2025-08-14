import { verifyJwt } from "@/utils/verifyJwt";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "@/utils/HttpError";
import {prisma} from "@/prisma";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies?.accessToken || (authHeader && authHeader.split(' ')[1]);
    if (!token) {
        next(new HttpError(401, "Token not provided"));
    }
    const payload = await verifyJwt(token);
    if (!payload) {
        next(new HttpError(401, "Invalid JWT"));
    }
    const session = await prisma.session.findUnique({where: {id: payload.sessionId}});
    const {revokedAt} = session;
    if (!session || revokedAt !== null) {
        next(new HttpError(401, "Session expired"));
    }
    req.user = payload;
    next();
}

