import {prisma} from "@/prisma";
import bcrypt from 'bcrypt'
import type { CreateUserDto, LoginDto } from "@/utils/validation";
import {HttpError} from "@/utils/HttpError";
import {User} from "@/../generated/prisma";
import { signJwt } from '@/utils/signJwt';

const authServices = {
    register: async (dataDto: CreateUserDto) => {
        const hashedPassword = await bcrypt.hash(dataDto.password, 10);
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
    },
    login: async (dataDto: LoginDto) => {
        const {email, password} = dataDto;
        const user =  await prisma.user.findUnique({
            where: {email: email},
        });
        if (!user) {
            throw new HttpError(401, 'User not found');
        }
        const { password: userPassword, ...publicUser } = user! as User;
        console.log(publicUser);
        const isMatch = await bcrypt.compare(password, userPassword);
        if (!isMatch) {
            throw new HttpError(401, 'Invalid password');
        }
        const {id, role} = publicUser
        const token = signJwt({ id, role }, '1h');
        console.log('token', token);
        return { token, user: publicUser };
    }
}
export default authServices;