import {Router} from "express";
import {categoryController} from "@/controllers/categoryController";
import {authMiddleware} from "@/middlewares/authMiddlware";

export const categoryRouter = Router();

categoryRouter.get('/', authMiddleware, categoryController.getCategories);