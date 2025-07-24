import { Request, Response, NextFunction } from "express";
import authServices from "@/services/authServices";
import { userSchema} from "@/utils/validation";
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
}