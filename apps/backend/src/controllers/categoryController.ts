import { Request, Response, NextFunction } from "express";
import {JwtPayload} from "@/utils/verifyJwt";
import categoryServices from "@/services/categoryServices";

export const categoryController = {
    getCategories: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { role }: JwtPayload = req.user;
            if (role === 'SELLER') {
                const categories = await categoryServices.getAllCategories();
                console.log('categories', categories);
                res.status(200).json(categories);
            } else {
                const categories = await categoryServices.getFeaturedCategories();
                res.status(200).json(categories);
            }
        } catch (error) {
            next(error)
        }

    }
}