import {prisma} from "@/prisma";
import {createOrderDto} from "@/utils/validation";
import {getDeliveryDuration} from "@/utils/getDeliveryDuration";
import {getDeliveryDateFromDuration} from "@/utils/getDeliveryDateFromDuration";
import {HttpError} from "@/utils/HttpError";

interface OrderItemDraft {
    productId: number;
    buyerId: number;
    sellerId: number;
    quantity: number;
    price: number;
    deliveryDate: Date;
}

const orderServices = {
    createOrder: async (dataDto, buyerId) => {
        const productIds = dataDto.map(product => product.productId);
        const products = await prisma.product.findMany({
            where: {
                id: { in : productIds },
            },
            include: {
                deliveryProfile: {
                    select: {
                        dayWeight: true,
                    }
                }

            }
        });

        const productsMap = new Map(products.map(p => [p.id, p]));

        const orderItemDraft: OrderItemDraft[] = dataDto.map((item) => {
            const product = productsMap.get(item.productId);
            const deliveryDuration = getDeliveryDuration(product, product.deliveryProfile);
            const deliveryDate = getDeliveryDateFromDuration(deliveryDuration);
            return {
                productId: item.productId,
                buyerId: buyerId,
                sellerId: product.sellerId,
                quantity: item.quantity,
                price: product.price,
                deliveryDate: deliveryDate,
            }
        })

        const totalPrice = orderItemDraft.reduce((acc, item) => {
            acc += item.quantity * item.price;
            return acc;
        }, 0);

        const groupsByDate = new Map<string, OrderItemDraft[]>();
        const groupsBySeller = new Map<string, OrderItemDraft[]>();

        for (const item of orderItemDraft) {
            const dateKey = item.deliveryDate.toISOString();
            const dateGroup = groupsByDate.get(dateKey) ?? [];
            dateGroup.push(item);
            groupsByDate.set(dateKey, dateGroup);


            const sellerKey = item.sellerId.toString();
            const sellerGroup = groupsBySeller.get(sellerKey) ?? [];
            sellerGroup.push(item);
            groupsBySeller.set(sellerKey, sellerGroup);
        }

        console.log('groupsByDate', groupsByDate);
        console.log('groupsBySeller', groupsBySeller);

        const buyerOrder = await prisma.buyerOrder.create({
            data: {
                buyer: { connect: { id: buyerId } },
                totalPrice: totalPrice,
            }
        })

        const createdGroups = [];
        for (const [dateStr, items] of groupsByDate) {
            const deliveryDate = new Date(dateStr);

            const deliveryGroup = await prisma.deliveryGroup.create({
                data: {
                    deliveryDate,
                    order: { connect: { id: buyerOrder.id}}
                }
            });
            createdGroups.push({
                id: deliveryGroup.id,
                deliveryDate,
                items,
            });
        }
        console.log('createdGroups', createdGroups);
        const createdSellerOrders = [];

        for (const [sellerId, items] of groupsBySeller) {
            const sellerOrder = await prisma.sellerOrder.create({
                data: {
                    seller: { connect: { id: Number(sellerId) } },
                }
            })
            createdSellerOrders.push({
                id: sellerOrder.id,
                items,
                sellerId,
            })
        }
        console.log('createdSellerOrders', createdSellerOrders);
        for (const item of orderItemDraft) {
            const sellerOrder = createdSellerOrders.find(order => Number(order.sellerId) === item.sellerId );
            const deliveryGroup = createdGroups.find(group => group.deliveryDate.toISOString() === item.deliveryDate.toISOString());
            const orderItem = await prisma.orderItem.create({
                data: {
                    product: { connect: { id: item.productId}},
                    buyerId: item.buyerId,
                    sellerId: item.sellerId,
                    price: item.price,
                    quantity: item.quantity,
                    deliveryGroup: {connect: {id: deliveryGroup.id}},
                    sellerOrder: {connect: {id: sellerOrder.id}},
                }
            })
        }
        const orderToReturn = await prisma.buyerOrder.findUnique({
            where: {
                id: buyerOrder.id
            },
            include: {
                deliveryGroups: {
                    include: {
                        items: true
                    }
                },
            }
        })
        return orderToReturn;
    },
    getSellerOrders: async (sellerId: number) => {
        try {
            return await prisma.sellerOrder.findMany({
                where: {
                    sellerId: sellerId,
                },
                include: {
                    orderItems: true,
                }
            })
        } catch (error) {
            if(error.code === 'P2025') {
                return new HttpError(404, 'User dont have orders')
            }
            return new HttpError(500, 'Unknown error');
        }
    },
    getBuyerOrders: async (buyerId: number) => {
        try {
            return await prisma.buyerOrder.findMany({
                where: {
                    buyerId: buyerId,
                },
                include: {
                    deliveryGroups: {
                        include: {
                            items: true
                        }
                    }
                }
            })
        } catch (error) {
            if(error.code === 'P2025') {
                return new HttpError(404, 'User dont have orders')
            }
            return new HttpError(500, 'Unknown error');
        }
    }
};
export default  orderServices;