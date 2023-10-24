import { PrismaClient as PrismaClient2 } from '../../../../../../prisma/generated/client2'

declare global {
    // eslint-disable-next-line no-var
    var cachedPrismaDocker: PrismaClient2
}

let prisma: PrismaClient2

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient2({})
} else {
    if (!global.cachedPrismaDocker) {
        global.cachedPrismaDocker = new PrismaClient2({ log: ['query'] })
    }
    prisma = global.cachedPrismaDocker
}

export const pgDocker = prisma
