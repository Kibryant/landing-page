import CreateTaskDto from '@/core/task/dtos/CreateTaskDto'
import Task from '@/core/task/entity/Task'
import { UserRepository } from '@/core/user/services/repository'
import { PrismaClient } from '../../../../../prisma/generated/clientTest'
import UpdateUserDto from '@/core/user/dtos/UpdateUserDto'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import User, { UserFriend } from '@/core/user/entity/User'
import { FriendOperationResult } from '@/types/res/FriendOperation'
import { Response } from '@/types/class/Response'

export default class RepositoryUserPrismaTest extends UserRepository {
    private prisma: PrismaClient

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
        const userEmailExists = await this.getUserByEmail(user.email)

        if (userEmailExists) {
            return new Response(null, 'User email exists', 409)
        }

        const userUsernameExists = await this.getUserByUsername(user.username)

        if (userUsernameExists) {
            return new Response(null, 'User username exists', 409)
        }

        const newUser = await this.prisma.user.create({
            data: {
                ...user,
                tasks: {
                    create: [],
                },
            },
        })

        return new Response(newUser, 'User created', 201)
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

    sentMessageToAnotherUser(senderId: string, receiverId: string, content: string): Promise<any> {
        throw new Error('Method not implemented.')
    }

    receivedMessages(receiverId: string): Promise<any> {
        throw new Error('Method not implemented.')
    }

    getAllMessagesByUserId(userId: string): Promise<any> {
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

    getAllFriends(userId: string): Promise<UserFriend[] | []> {
        throw new Error('Method not implemented.')
    }

    getAllFriendsRequests(userId: string): Promise<UserFriend[] | []> {
        throw new Error('Method not implemented.')
    }
}
