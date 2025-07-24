import z from 'zod';
import { Role } from '@/../generated/prisma';

export const userSchema = z.object({
    email: z.email(),
    password: z.string(),
    role:  z.enum([Role.BUYER, Role.SELLER]),
})

export type CreateUserDto = z.infer<typeof userSchema>;