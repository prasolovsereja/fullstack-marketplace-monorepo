import {prisma} from "@/prisma";

const categoryServices = {
    getAllCategories:  async () => prisma.category.findMany(),
    getFeaturedCategories: async () => prisma.category.findMany({ where: { isFeatured: true } }),
}
export default categoryServices