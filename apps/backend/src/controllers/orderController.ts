import { Request, Response, NextFunction } from "express";
import orderServices from "../services/orderServices";
import {createOrderSchema} from "@/utils/validation";
import {HttpError} from "@/utils/HttpError";

export const orderController = {
    getOrders: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user) {
                next(new HttpError(404, "User not provided"));
            }
            const {id, role} = user;
            if (role === 'SELLER') {
                const orders = await orderServices.getSellerOrders(id);
                res.status(200).json(orders);
            } else if (role === 'BUYER') {
                const orders = await orderServices.getBuyerOrders(id);
                res.status(200).json(orders);
            }
        } catch (err) {
            next(err);
        }
    },
    createOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = createOrderSchema.safeParse(req.body);
            if (!result.success) {
                next(new HttpError(400, 'Invalid credentials'));
            }
            const user = req.user;
            const {id} = user;
            const order = await orderServices.createOrder(result, id);
            res.status(201).json(order);
        } catch (err) {
            next(err)
        }
    }
}