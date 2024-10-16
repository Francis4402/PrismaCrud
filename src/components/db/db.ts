import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSignleton = () => {
    return new PrismaClient().$extends(withAccelerate());
};

type prismaClientSignleton = ReturnType<typeof prismaClientSignleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: prismaClientSignleton | undefined;
}

export const db = globalForPrisma.prisma ?? prismaClientSignleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db