import { Request, Response, NextFunction } from "express";
import sellerHelperService from "@/services/seller-helperServices";

export const sellerHelperController = {
    getDeliveryProfiles: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deliveredProfiles = await sellerHelperService.getDeliveryProfiles();
            res.status(200).json(deliveredProfiles);
        } catch (err) {
            next(err);
        }
    }
}