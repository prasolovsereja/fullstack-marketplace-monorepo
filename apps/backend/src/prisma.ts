import { PrismaClient } from '@/../generated/prisma';
import dotenv from 'dotenv';
import * as process from 'node:process';


dotenv.config();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;