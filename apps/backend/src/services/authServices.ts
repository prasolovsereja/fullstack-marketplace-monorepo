import {prisma} from "@/prisma";
import { hash } from 'bcrypt'
import type { CreateUserDto } from "@/utils/validation";
import {HttpError} from "@/utils/HttpError";

const authServices = {
    register: async (dataDto: CreateUserDto) => {
        const hashedPassword = await hash(dataDto.password, 10);
        const data = { email: dataDto.email, password: hashedPassword, role: dataDto.role}
        try {
            return prisma.user.create({ data });
        } catch (error: any) {
            if (
                error.code === 'P2002' &&
                error.meta?.target?.includes('email')
            ) {
                throw new HttpError(409, 'User with email already exists');
            }
            throw error;
        }
    }
}
export default authServices;