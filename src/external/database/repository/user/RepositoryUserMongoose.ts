/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserRepository } from '@/core/user/services/repository'
import UserModel from '../../models/user/UserModel'
import { UserMongooseDocument } from '@/types/UserMongooseDocument'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import CreateTaskDto from '@/core/task/dtos/CreateTaskDto'
import Task from '@/core/task/entity/Task'
import Message from '@/core/message/entity/Message'
import type User from '@/core/user/entity/User'
import { FriendOperationResult } from '@/types/res/FriendOperation'
import UpdateUserDto from '@/core/user/dtos/UpdateUserDto'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { UserFriend } from '@/core/user/entity/User'
import MessageOperationResult from '@/types/res/MessageOperation'
import TaskOperationResult from '@/types/res/TaskOperation'

export class RepositoryUserMongo extends UserRepository {
    async getAllSentMessagesByUserId(userId: string): Promise<MessageOperationResult<Message[]>> {
        const user = await this.getUserById(userId)

        if (!user) {
            return {
                success: false,
                error: 'User not found',
            }
        }

        return {
            success: true,
            message: user.sentMessages || [],
        }
    }

    async getAllFriendsRequest(userId: string): Promise<UserFriend[] | null> {
        const user = await this.getUserById(userId)

        if (!user) {
            return null
        }

        return user.friendsRequests || []
    }

    async addNewFriend(userId: string, friendId: string): Promise<FriendOperationResult> {
        const user = await this.getUserById(userId)
        const friend = await this.getUserById(friendId)

        if (!user || !friend) {
            return {
                success: false,
                error: 'User or friend not found',
            }
        }

        user.friends?.push({
            username: friend.username,
            email: friend.email,
        })

        friend.friends?.push({
            username: user.username,
            email: user.email,
        })

        await this.updateUser(userId, { friends: user.friends })
        await this.updateUser(friendId, { friends: friend.friends })

        return {
            success: true,
            friend,
        }
    }

    async sentFriendRequest(senderId: string, receiverId: string): Promise<FriendOperationResult> {
        const sender = await this.getUserById(senderId)
        const receiver = await this.getUserById(receiverId)

        if (!sender || !receiver) {
            return {
                success: false,
                error: 'Sender or receiver not found',
            }
        }

        sender.friendsRequests?.push({
            username: receiver.username,
            email: receiver.email,
        })

        receiver.friendsRequests?.push({
            username: sender.username,
            email: sender.email,
        })

        await this.updateUser(senderId, { friendsRequests: sender.friendsRequests })
        await this.updateUser(receiverId, { friendsRequests: receiver.friendsRequests })

        return {
            success: true,
            friend: receiver,
        }
    }

    async getAllFriends(userId: string): Promise<UserFriend[] | []> {
        const user = await this.getUserById(userId)

        if (!user) {
            return []
        }

        return user.friends || []
    }

    async getAllFriendsRequests(userId: string): Promise<UserFriend[] | []> {
        const user = await this.getUserById(userId)

        if (!user) {
            return []
        }

        return user.friendsRequests || []
    }

    async sentMessageToAnotherUser(
        senderId: string,
        receiverId: string,
        content: string,
    ): Promise<MessageOperationResult<Message>> {
        try {
            const sender = await this.getUserById(senderId)

            if (!sender) {
                return {
                    success: false,
                    error: 'Sender not found',
                }
            }

            const receiver = await this.getUserById(receiverId)

            if (!receiver) {
                return {
                    success: false,
                    error: 'Receiver not found',
                }
            }

            const message = new Message({ senderId, receiverId, content, createdAt: new Date() })

            sender?.sentMessages?.push(message)
            receiver?.receivedMessages?.push(message)

            await sender.updateOne(sender)
            await receiver.updateOne(receiver)

            return {
                success: true,
                message,
            }
        } catch (error) {
            return {
                success: false,
                error: 'Error sending message to another user',
            }
        }
    }

    async receivedMessages(receiverId: string): Promise<MessageOperationResult<Message[]>> {
        try {
            const receiver = await this.getUserById(receiverId)

            if (!receiver) {
                return {
                    success: false,
                    error: 'Receiver not found',
                }
            }

            return {
                success: true,
                message: receiver.receivedMessages,
            }
        } catch (error) {
            return {
                success: false,
                error: 'Error getting received messages',
            }
        }
    }

    async getAllMessagesByUserId(userId: string): Promise<MessageOperationResult<Message[]>> {
        try {
            const user = await this.getUserById(userId)

            if (!user) {
                return {
                    success: false,
                    error: 'User not found',
                }
            }

            return {
                success: true,
                message: user.sentMessages,
            }
        } catch (error) {
            return {
                success: false,
                error: 'Error getting messages',
            }
        }
    }

    async getAllUsers(): Promise<User[]> {
        const users = await UserModel.find()

        return users
    }

    async getUserById(id: string): Promise<UserMongooseDocument | null> {
        const user = await UserModel.findById(id)

        if (!user) {
            return null
        }

        return user
    }

    async addNewTaskToUser(userId: string, task: CreateTaskDto): Promise<TaskOperationResult<Task>> {
        const user = await this.getUserById(userId)

        if (!user) {
            return {
                success: false,
                error: 'User not found',
            }
        }

        const newTask = new Task(task).toObject() as unknown as Task

        user.tasks?.push(newTask)

        await user.updateOne(user)

        return {
            success: true,
            task: newTask,
        }
    }

    async getAllTasksByUserId(userId: string): Promise<TaskOperationResult<Task[]>> {
        const user = await this.getUserById(userId)

        if (!user) {
            return {
                success: false,
                error: 'User not found',
            }
        }

        return {
            success: true,
            task: user.tasks,
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return null
        }

        return user
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = await UserModel.findOne({ username })

        if (!user) {
            return null
        }

        return user
    }

    async createNewUser({ email, password, username }: CreateUserDto): Promise<Response<UserMongooseDocument | null>> {
        try {
            const userEmailExists = await this.getUserByEmail(email)

            if (userEmailExists) {
                return new Response(null, 'User email exists', HttpStatusCode.CONFLICT)
            }

            const userUsernameExists = await this.getUserByUsername(username)

            if (userUsernameExists) {
                return new Response(null, 'User username exists', HttpStatusCode.CONFLICT)
            }

            const newUser: UserMongooseDocument = new UserModel({
                email,
                username,
                password,
                tasks: [],
                sentMessages: [],
                receivedMessages: [],
                friends: [],
                friendsRequests: [],
            })

            await newUser.save()

            return new Response(newUser, 'User created', HttpStatusCode.CREATED)
        } catch (error) {
            throw new Error('Error creating a new user: ' + error)
        }
    }

    async updateUser(userId: string, updatedFields: UpdateUserDto): Promise<User | null> {
        const user = await this.getUserById(userId)

        if (!user) {
            return null
        }

        user.updateOne(updatedFields)

        return user
    }
}
