import { Request, Response, NextFunction } from "express";
import authServices from "@/services/authServices";
import {loginSchema, userSchema} from "@/utils/validation";
import { HttpError } from "@/utils/HttpError";


export const authController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = userSchema.safeParse((req.body));
            if (!result.success) {
                next(new HttpError(400, 'Invalid credentials'));
            }
            const user = await authServices.register(result.data!);
            const { email, id, role } = user;
            res.status(201).json({email, role, id});
            console.log('User created successfully');
        } catch (error) {
            next(error);
        }

    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = loginSchema.safeParse((req.body));
            if (!result.success) {
                next(new HttpError(400, 'Invalid credentials'));
            }
            const {token, user} = await authServices.login(result.data!);
            res.status(200).json({token, user});
            console.log('User login successfully redirect to app');
        } catch (error) {
            next(error);
        }
    },
    me: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await authServices.me(req.user!);
            console.log('User login successfully');
            console.log('auth/me okay');
            res.status(200).json({user});
        } catch (err) {
            next(err);
        }
    }
}