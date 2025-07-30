import {JwtPayload} from "@/utils/verifyJwt";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}