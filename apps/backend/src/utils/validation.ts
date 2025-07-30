import z from 'zod';
import { Role } from '@/../generated/prisma';
import {prisma} from "@/prisma";
import {HttpError} from "@/utils/HttpError";

export const userSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    role:  z.enum([Role.BUYER, Role.SELLER]),
})

export type CreateUserDto = z.infer<typeof userSchema>;
export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});
export type LoginDto = z.infer<typeof loginSchema>;
export const createProductSchema = z.object({
    title:z.string().min(3),
    description:z.string().optional(),
    price: z.number().min(1),
    quantity: z.number().min(1),
    categories: z.array(z.object({
        id: z.number().int(),
        name: z.string(),
    }))
})
export type CreateProductDto = z.infer<typeof createProductSchema>;

export const validateCategoryIdsExist = async (data: [{ id: number, name: string}]) => {
    const dataMap = Object.fromEntries(data.map(obj => [obj.id, obj.name]));
    const ids = data.map(x => x.id);
    const categories = await prisma.category.findMany({
        where: { id: { in: ids }},
        select: { id: true, name: true}
    });
    const fetchedIds = new Set(categories.map(c => c.id));
    const missingIds = ids.filter(id => !fetchedIds.has(id));
    if (missingIds.length > 0) {
        throw new HttpError(404, `Категории не найдены: ${missingIds.map(id => dataMap[id]).join(', ')}`);
    }
    return true;
}

export const querySchema = z.object({
    limit: z.string().optional().transform(val => Number(val ?? 12)).refine(n => n > 0 && n <= 100),
    offset: z.string().optional().transform(val => Number(val ?? 0)).refine(n => n >= 0),
});
export type queryType = z.infer<typeof querySchema>;