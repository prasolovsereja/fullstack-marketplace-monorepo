import {CreateProductDto} from "@/utils/validation";
import {prisma} from "@/prisma";
import {validateCategoryIdsExist} from "@/utils/validation";
import {HttpError} from "@/utils/HttpError";
import {getDeliveryDuration} from "@/utils/getDeliveryDuration";


const productsServices = {
    createProduct: async (dataDto: CreateProductDto, userId: number) => {
        try {
            await validateCategoryIdsExist(dataDto.categories);
            const data = {
                title: dataDto.title,
                description: dataDto.description,
                price: dataDto.price,
                quantity: dataDto.quantity,
                sellerId: userId,
                categories: {
                    connect: dataDto.categories.map((cat) => ({ id: cat.id }))
                },
                deliveryProfileId: dataDto.deliveryProfileId
            }
            return await prisma.product.create({ data });
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            if (error.code === 'P2025' ) {
                throw new HttpError(404, 'Некоторая из категорий или продавец не найдены');
            }
            if(error.code ==='P2003') {
                throw new HttpError(400, 'Нарушение внешнего ключа — возможно, неверный sellerId')
            }
            throw new HttpError(500, 'Неизвестная ошибка при создании товара');
        }
    },
    getSellerProducts: async (userId: number, {limit, offset}: {limit: number, offset: number}) => {
        try {
            const products = await prisma.product.findMany({
                where: {sellerId: userId},
                skip: offset,
                take: limit,
                include: {deliveryProfile: true}
            });
            const deliveryProfiles = await prisma.deliveryProfile.findMany({});

            return products.map((product) => {
                const productDeliveryProfile = deliveryProfiles.find((p) => p.id === product.deliveryProfileId);

                return {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: product.quantity,
                    deliveryDuration: getDeliveryDuration(product.id, productDeliveryProfile),
                }
            });
        }   catch (error) {
            if (error.code === 'P2025') {
                throw new HttpError(404, 'Товары продавца не найдены');
            }
            throw new HttpError(500, 'Неизвестная ошибка при создании товара');
        }
    },
    getClientProducts: async ({limit, offset}: {limit: number, offset: number}) => {
        try {
            const products = await prisma.product.findMany({
                skip: offset,
                take: limit,
                include: {deliveryProfile: true}
            })
            return products.map((product) => ({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: product.quantity,
                deliveryDuration: getDeliveryDuration(product.id, product.deliveryProfileId),
            }))
        } catch (error) {
            throw new HttpError(500, 'Неизвестная ошибка при создании товара');
        }
    }

}
export default productsServices;