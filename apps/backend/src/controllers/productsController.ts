import { Request, Response, NextFunction } from "express";
import productsServices from "@/services/productsServices";
import {HttpError} from "@/utils/HttpError";
import {createProductSchema, querySchema, queryType} from "@/utils/validation";
import {JwtPayload} from "@/utils/verifyJwt";

export const productsController = {
    createProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            const result = createProductSchema.safeParse(req.body);
            if (!result.success) {
                next(new HttpError(400, 'Invalid credentials'));
            }
            console.log('success');
            const product = await productsServices.createProduct(result.data!, user!.id);
            res.status(200).json({product});
        }  catch (e) {
            next(e);
        }
    },
    getProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset }: queryType = await querySchema.parse(req.query);
            const user = req.user;
            const {id, role}: JwtPayload = user;
            if (role === 'SELLER') {
                const products = await productsServices.getSellerProducts(id, {limit, offset})

                res.status(200).json({products});
            } else {
                const products = await productsServices.getClientProducts({limit, offset})
                res.status(200).json({products});
            }
        } catch(e) {
            next(e);
        }
    }
}