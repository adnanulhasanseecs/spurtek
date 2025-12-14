import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client singleton
 * Prevents multiple instances in development with hot reloading
 * 
 * Prisma 7: If DATABASE_URL is not set, returns a mock client for demo mode
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Check if database is configured
const hasDatabase = !!process.env.DATABASE_URL;

// Mock Prisma client for demo mode (no database)
const createMockPrisma = () => ({
  lead: {
    create: () => Promise.reject(new Error('Database not configured. Please set DATABASE_URL in .env.local')),
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
  },
  download: {
    create: () => Promise.reject(new Error('Database not configured')),
    findMany: () => Promise.resolve([]),
  },
  newsletter: {
    create: () => Promise.reject(new Error('Database not configured')),
    findUnique: () => Promise.resolve(null),
  },
  pageView: {
    create: () => Promise.reject(new Error('Database not configured')),
  },
  formSubmission: {
    create: () => Promise.reject(new Error('Database not configured')),
  },
}) as unknown as PrismaClient;

export const prisma = (() => {
  if (!hasDatabase) {
    // Return mock client for demo mode
    return createMockPrisma();
  }

  // Initialize real Prisma client when DATABASE_URL is available
  // Prisma 7: Connection is handled via DATABASE_URL environment variable
  return (
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  );
})();

if (process.env.NODE_ENV !== 'production' && hasDatabase) {
  globalForPrisma.prisma = prisma as PrismaClient;
}

