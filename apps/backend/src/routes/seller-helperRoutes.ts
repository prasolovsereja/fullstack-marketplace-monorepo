import {Router} from "express";
import {sellerHelperController} from "@/controllers/seller-helperController";
import {authMiddleware} from "@/middlewares/authMiddlware";

export const sellerHelperRoutes = Router();

sellerHelperRoutes.get('/profiles', authMiddleware, sellerHelperController.getDeliveryProfiles);