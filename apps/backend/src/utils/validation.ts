import z from 'zod';
import { Role } from '@/../generated/prisma';

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