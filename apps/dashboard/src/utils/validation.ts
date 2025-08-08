import z from "zod";

export const productSchema = z.object({
    title: z.string().min(1, 'Введите название товара'),
    description: z.string().optional(),
    price: z.number().positive('Цена должна быть больше 0'),
    quantity: z.number().min(1, 'Минимум 1'),
    categories: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        })
    ).min(1, 'Выберите хотя бы 1 категорию'),
})