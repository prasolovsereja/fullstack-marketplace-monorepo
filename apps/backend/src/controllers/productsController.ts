import { Request, Response, NextFunction } from "express";
import productsServices from "@/services/productsServices";
import {HttpError} from "@/utils/HttpError";
import {createProductSchema} from "@/utils/validation";

export const productsController = {
    createProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            const result = createProductSchema.safeParse(req.body);
            if (!result.success) {
                next(new HttpError(400, 'Invalid credentials'));
            }
            const product = await productsServices.createProduct(result.data!, user!.id);
            res.status(200).json({product});
        }  catch (e) {
            next(e);
        }
    }
}