import CreateTaskDto from '@/core/tasks/dtos/CreateTaskDto'
import Task from '@/core/tasks/model/Task'
import { UserRepository } from '@/core/user/services/repository'
import { PrismaClient } from '../../../../../prisma/generated/client1'
import UpdateUserDto from '@/core/user/dtos/UpdateUserDto'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import User from '@/core/user/entity/User'
import { DeepMockProxy } from 'jest-mock-extended'

export type MockContext = DeepMockProxy<PrismaClient>

export default class RepositoryUserPrisma extends UserRepository {
    private prisma: PrismaClient | MockContext

    constructor(prisma: PrismaClient) {
        super()
        this.prisma = prisma
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        })

        if (!user) {
            return null
        }

        return user
        // return await this.prisma.user.findUnique({
        //     where: {
        //         id,
        //     },
        // })
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        })
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: {
                username,
            },
        })
    }

    async createNewUser(user: CreateUserDto): Promise<User | null> {
        const newUser = await this.prisma.user.create({
            data: {
                ...user,
                tasks: {
                    create: user.tasks,
                },
            },
        })

        return newUser
    }

    async updateUser(id: string, user: UpdateUserDto): Promise<User | null> {
        return await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...user,
            },
        })
    }

    async deleteUser(id: string): Promise<User> {
        return await this.prisma.user.delete({
            where: {
                id,
            },
        })
    }

    addNewTaskToUser(userId: string, task: CreateTaskDto): Promise<Task | null> {
        console.log(userId, task)
        throw new Error('Method not implemented.')
    }

    getAllTasksByUserId(userId: string): Promise<Task[] | null> {
        console.log(userId)
        throw new Error('Method not implemented.')
    }
}
