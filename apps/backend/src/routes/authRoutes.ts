import {Router} from "express";
import {authController} from "@/controllers/authController";
import {authMiddleware} from "@/middlewares/authMiddlware";
import {refreshMiddleware} from "@/middlewares/refreshMiddleware";

export const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/me', authMiddleware,  authController.me);
authRouter.patch('/logout', authMiddleware, authController.logout);
authRouter.post('/refresh', refreshMiddleware, authController.refresh);