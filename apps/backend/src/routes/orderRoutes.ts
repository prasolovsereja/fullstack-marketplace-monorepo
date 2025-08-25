import {Router} from "express";
import {authMiddleware} from "@/middlewares/authMiddlware";
import {orderController} from "@/controllers/orderController";

export const orderRoutes = Router();

orderRoutes.get('/', authMiddleware, orderController.getOrders);
orderRoutes.post('/', authMiddleware, orderController.createOrder);