import {prisma} from "@/prisma";
import bcrypt from 'bcrypt'
import type { CreateUserDto, LoginDto } from "@/utils/validation";
import {HttpError} from "@/utils/HttpError";
import {User} from "@/../generated/prisma";
import { signJwt } from '@/utils/signJwt';
import {getExpiresAt} from "@/utils/getExpiresAt";
import {resolveDeviceLabel} from "@/utils/resolveDeviceLabel";

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
        const {email, password, userAgent} = dataDto;

        let deviceLabel = resolveDeviceLabel(userAgent);

        const user =  await prisma.user.findUnique({
            where: {email: email},
        });
        if (!user) {
            throw new HttpError(401, 'User not found');
        }
        const { password: userPassword, ...publicUser } = user! as User;

        const isMatch = await bcrypt.compare(password, userPassword);
        if (!isMatch) {
            throw new HttpError(401, 'Invalid password');
        }
        const {id, role} = publicUser

        const userSessions = await prisma.session.findMany({
            where: {
                userId: id,
                revokedAt: null,
                refreshToken: {
                    some: {
                        expiresAt: { gt: new Date()},
                        replacedById: null,
                    },
                },
            },
            include: {
                refreshToken: {
                    where: {
                        expiresAt: { gt: new Date()},
                        replacedById: null,
                    }
                }
            }
        })

        if (userSessions.some(session => session.deviceLabel === deviceLabel)) {
            deviceLabel = 'guest';
        }


        const session = await prisma.session.create({
            data: {
                userId: id,
                deviceLabel,
                lastUsedAt: new Date(),
                revokedAt: null,
            }
        });

        const {id: sessionId} = session;

        const token = signJwt({ id, role, sessionId }, '1h');
        const refreshToken = signJwt({ id, role, sessionId }, '7Day');
        const refreshExpiresAt = getExpiresAt(60 * 60 * 24 * 7);

        const tokenHash = await bcrypt.hash(refreshToken, 10);

        await prisma.refreshToken.create({
            data: {
                sessionId,
                tokenHash,
                replacedById: null,
                expiresAt: refreshExpiresAt,
                updatedAt: new Date(),
            }
        })

        return { token, refreshToken, user: publicUser };
    },
    me: async (data: {id: number, role: string}) => {
        const id = data.id;
        const user = await prisma.user.findUnique({ where: { id: id}})
        const { password, ...publicUser } = user!
        return { user: publicUser };
    },
    logout: async ({ sessionId }) => {
        await prisma.session.update({
            where: {
                id: sessionId,
            },
            data: {
                revokedAt: new Date(),
            }
        })
    },
}
export default authServices;