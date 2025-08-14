import { Request, Response, NextFunction } from "express";
import authServices from "@/services/authServices";
import {loginSchema, userSchema} from "@/utils/validation";
import { HttpError } from "@/utils/HttpError";
import {serialize} from "cookie";
import process from "node:process";
import {JwtPayload} from "@/utils/verifyJwt";
import {logoutUrls} from "@/utils/urlConfig";



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
            const {token, user, refreshToken} = await authServices.login(result.data!);
            res.status(200).json({token, user, refreshToken});

        } catch (error) {
            next(error);
        }
    },
    me: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await authServices.me(req.user!);
            res.status(200).json({user});
        } catch (err) {
            next(err);
        }
    },
    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('logging out');
            const { role, sessionId }: JwtPayload = req.user;

            await authServices.logout({sessionId});

            const token = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;

            res.setHeader('Set-Cookie', [
                serialize('accessToken', token, {
                    httpOnly: true,
                    maxAge: 0,
                    path: '/',
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production',

                }),
                serialize('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 0,
                    path: '/',
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production',
                }),
            ]);
            switch (role) {
                case 'SELLER':
                    res.status(200).json(logoutUrls.react);
                    break;
                case "BUYER":
                    res.status(200).json(logoutUrls.next);
                    break;
                default:
                    res.status(200).json(logoutUrls.default);
            }
        } catch (error) {
            next(new HttpError(400, 'Ошибка выхода'));
        }
    },
    refresh: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id, role, sessionId, refreshToken} = req.user;
            const { newToken, newRefreshToken } = await authServices.refresh({id, role, sessionId, refreshToken});

            res.setHeader('Set-Cookie', [
                serialize('refreshToken', '', {
                    httpOnly: true,
                    maxAge: 0,
                    path: '/',
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production',
                }),
                serialize('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production',
                }),
                serialize('accessToken', newToken, {
                    httpOnly: true,
                    maxAge: 60 * 60,
                    path: '/',
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production',
                }),
            ]);
            res.status(204).end();
        } catch (error) {
            next(new HttpError(400, 'Ошибка обновления токенов'));
        }
    }
}