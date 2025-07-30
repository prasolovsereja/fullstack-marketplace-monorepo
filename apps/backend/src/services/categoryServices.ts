import {prisma} from "@/prisma";

const categoryServices = {
    getAllCategories:  () => prisma.category.findMany(),
    getFeaturedCategories: () => prisma.category.findMany({ where: { isFeatured: true } }),
}
export default categoryServices