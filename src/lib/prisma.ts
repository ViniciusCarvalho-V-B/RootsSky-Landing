import { PrismaClient } from "@prisma/client";

// Evita multiplas instancias do Prisma em modo de desenvolvimento devido ao hot-reloading do Next.js
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
