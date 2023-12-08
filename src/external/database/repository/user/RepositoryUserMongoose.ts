/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserRepository } from '@/core/user/services/repository'
import UserModel from '../../model/user/UserModel'
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
// Define a set of fields that can be updated in a user profile

// Create a class that extends the UserRepository
export class RepositoryUserMongo extends UserRepository {
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

    sentFriendRequest(senderId: string, receiverId: string): Promise<FriendOperationResult> {
        throw new Error('Method not implemented.')
    }

    getAllFriends(userId: string): Promise<User[] | []> {
        throw new Error('Method not implemented.')
    }

    getAllFriendsRequests(userId: string): Promise<User[] | []> {
        throw new Error('Method not implemented.')
    }

    async sentMessageToAnotherUser(senderId: string, receiverId: string, content: string): Promise<boolean> {
        try {
            const sender = await UserModel.findById(senderId)

            if (!sender) {
                return false
            }

            const receiver = await UserModel.findById(receiverId)

            if (!receiver) {
                return false
            }

            const message = new Message({ senderId, receiverId, content, createdAt: new Date() })

            sender.sentMessages.push(message)
            receiver.receivedMessages.push(message)

            await sender.updateOne(sender)
            await receiver.updateOne(receiver)

            return true
        } catch (error) {
            throw new Error('Error sending message to another user: ' + error)
        }
    }

    receivedMessages(receiverId: string): Promise<Message[] | null> {
        throw new Error('Method not implemented.')
    }

    async getAllMessagesByUserId(userId: string): Promise<Message[] | null> {
        try {
            const user = await UserModel.findById(userId)

            if (!user) {
                return null
            }

            return user.receivedMessages
        } catch (error) {
            throw new Error('Error fetching all messages by user id: ' + error)
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await UserModel.find()
        } catch (error) {
            throw new Error('Error fetching all users: ' + error)
        }
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            return await UserModel.findById(id)
        } catch (error) {
            throw new Error('Error fetching user by id: ' + error)
        }
    }

    addNewTaskToUser(userId: string, task: CreateTaskDto): Promise<Task | null> {
        throw new Error('Method not implemented.')
    }

    getAllTasksByUserId(userId: string): Promise<Task[] | null> {
        throw new Error('Method not implemented.')
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            return (await UserModel.findOne({ email })) ?? null
        } catch (error) {
            throw new Error('Error fetching user by email: ' + error)
        }
    }

    async getUserByUsername(username: string): Promise<User | null> {
        try {
            return (await UserModel.findOne({ username })) ?? null
        } catch (error) {
            throw new Error('Error fetching user by username: ' + error)
        }
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
        try {
            return (await UserModel.findByIdAndUpdate(userId, updatedFields, { new: true })) ?? null
        } catch (error) {
            throw new Error('Error updating user: ' + error)
        }
    }
}
