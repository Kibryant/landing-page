import { PrismaClient } from './prisma/generated/clientTest'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma from './clientTest'

jest.mock('./clientTest', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
