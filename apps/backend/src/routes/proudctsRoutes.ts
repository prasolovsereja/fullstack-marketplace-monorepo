import {Router} from "express";
import {productsController} from "@/controllers/productsController";
import {authMiddleware} from "@/middlewares/authMiddlware";

export const productsRouter = Router();

productsRouter.post('/', authMiddleware, productsController.createProduct);
productsRouter.get('/', authMiddleware, productsController.getProduct)