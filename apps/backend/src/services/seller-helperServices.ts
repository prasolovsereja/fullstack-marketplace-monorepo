import {prisma} from "@/prisma";
import {HttpError} from "@/utils/HttpError";

const sellerHelperService = {
    getDeliveryProfiles: async () => {
        try {
            return prisma.deliveryProfile.findMany({
                select: {
                    id: true,
                    code: true,
                    name: true,
                }
            })
        } catch (error) {
            return new HttpError(400, 'Ошибка получения информации о доставках')
        }
    }
}
export default sellerHelperService;