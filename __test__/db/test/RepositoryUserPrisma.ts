import CreateTaskDto from '@/core/task/dtos/CreateTaskDto'
import Task from '@/core/task/entity/Task'
import { UserRepository } from '@/core/user/services/repository'
import { PrismaClient } from '../../../prisma/generated/client1'
import UpdateUserDto from '@/core/user/dtos/UpdateUserDto'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import User, { UserFriend } from '@/core/user/entity/User'
import { DeepMockProxy } from 'jest-mock-extended'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import Message from '@/core/message/entity/Message'
import { FriendOperationResult } from '@/types/res/FriendOperation'
import MessageOperationResult from '@/types/res/MessageOperation'

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

    async createNewUser(user: CreateUserDto): Promise<Response<User | null>> {
        const newUser = await this.prisma.user.create({
            data: {
                ...user,
                tasks: {
                    create: user.tasks,
                },
            },
        })

        return new Response(newUser, 'User created', HttpStatusCode.CREATED)
    }

    async updateUser(id: string, { email, password, tasks, username }: UpdateUserDto): Promise<User | null> {
        return await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                email,
                password,
                tasks: {
                    create: tasks,
                },
                username,
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

    sentMessageToAnotherUser(
        senderId: string,
        receiverId: string,
        content: string,
    ): Promise<MessageOperationResult<Message>> {
        throw new Error('Method not implemented.')
    }

    receivedMessages(receiverId: string): Promise<MessageOperationResult<Message[]>> {
        throw new Error('Method not implemented.')
    }

    getAllSentMessagesByUserId(userId: string): Promise<MessageOperationResult<Message[]>> {
        throw new Error('Method not implemented.')
    }

    getAllUsers(): Promise<User[]> {
        throw new Error('Method not implemented.')
    }

    addNewFriend(userId: string, friendId: string): Promise<FriendOperationResult> {
        throw new Error('Method not implemented.')
    }

    sentFriendRequest(senderId: string, receiverId: string): Promise<FriendOperationResult> {
        throw new Error('Method not implemented.')
    }

    getAllFriends(userId: string): Promise<UserFriend[] | null> {
        throw new Error('Method not implemented.')
    }

    getAllFriendsRequest(userId: string): Promise<UserFriend[] | null> {
        throw new Error('Method not implemented.')
    }
}
