import Message from '@/core/message/entity/Message'
import CreateTaskDto from '@/core/task/dtos/CreateTaskDto'
import Task from '@/core/task/entity/Task'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import UpdateUserDto from '@/core/user/dtos/UpdateUserDto'
import User, { UserFriend } from '@/core/user/entity/User'
import { UserRepository } from '@/core/user/services/repository'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { Response } from '@/types/class/Response'
import { FriendOperationResult } from '@/types/res/FriendOperation'
import MessageOperationResult from '@/types/res/MessageOperation'
import { randomUUID } from 'node:crypto'

export default class RepositoryUserMemory implements UserRepository {
    private readonly users: User[] = []

    async createNewUser({ email, password, username }: CreateUserDto): Promise<Response<User | null>> {
        const userEmailExists = await this.getUserByEmail(email)
        const userUsernameExists = await this.getUserByUsername(username)

        if (userEmailExists) {
            return new Response(null, 'Email already exists', HttpStatusCode.CONFLICT)
        }

        if (userUsernameExists) {
            return new Response(null, 'Username already exists', HttpStatusCode.CONFLICT)
        }

        const newUser: User = {
            _id: randomUUID(),
            email,
            password,
            username,
            createdAt: new Date(),
            friends: [],
            friendsRequests: [],
            receivedMessages: [],
            sentMessages: [],
            tasks: [],
        }

        const result = this.users.push(newUser)

        if (result === -1) {
            return new Response(null, 'User not created', HttpStatusCode.INTERNAL_SERVER_ERROR)
        }

        return new Response(newUser, 'User created', HttpStatusCode.CREATED)
    }

    async updateUser(userId: string, updatedFields: UpdateUserDto): Promise<User | null> {
        const index = this.users.findIndex((user) => user._id === userId)
        if (index === -1) return null
        const updatedUser = { ...this.users[index], ...updatedFields }
        this.users[index] = updatedUser
        return updatedUser
    }

    async getAllTasksByUserId(userId: string): Promise<Task[] | null> {
        const user = this.users.find((user) => user._id === userId)

        if (!user) {
            return null
        }

        return user.tasks ?? null
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = this.users.find((user) => user.email === email)
        return user ?? null
    }

    async getUserById(_id: string): Promise<User | null> {
        const user = this.users.find((user) => user._id === _id)
        return user ?? null
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = this.users.find((user) => user.username === username)
        return user ?? null
    }

    async addNewTaskToUser(userId: string, task: CreateTaskDto): Promise<Task | null> {
        const userIndex = this.users.findIndex((user) => user._id === userId)

        if (userIndex === -1) {
            return null
        }

        const newTask = new Task({ ...task })

        this.users[userIndex].tasks?.push(newTask)

        return newTask
    }

    async getAllMessagesByUserId(userId: string): Promise<MessageOperationResult> {
        const user = this.users.find((user) => user._id === userId)
        return {
            success: true,
            message: (user?.sentMessages as Message[]) ?? null,
        }
    }

    async sentMessageToAnotherUser(
        senderId: string,
        receiverId: string,
        content: string,
    ): Promise<MessageOperationResult> {
        const sender = this.users.find((user) => user._id === senderId)
        const receiver = this.users.find((user) => user._id === receiverId)

        if (!sender) {
            return { success: false, error: 'Sender not found' }
        }

        if (!receiver) {
            return { success: false, error: 'Receiver not found' }
        }

        const message = new Message({
            content,
            receiverId,
            senderId,
            createdAt: new Date(),
        })

        sender.sentMessages?.push(message)
        receiver.receivedMessages?.push(message)

        return { success: true, message }
    }

    async receivedMessages(receiverId: string): Promise<MessageOperationResult> {
        const user = this.users.find((user) => user._id === receiverId)
        return {
            success: true,
            message: (user?.receivedMessages as Message[]) ?? null,
        }
    }

    async getAllUsers(): Promise<User[] | []> {
        const users = this.users
        return users ?? null
    }

    async addNewFriend(userId: string, friendId: string): Promise<FriendOperationResult> {
        const friend = this.users.find((user) => user._id === friendId)
        const user = this.users.find((user) => user._id === userId)

        if (!user || !friend) return { success: false, error: 'User not found' }

        const isFriend = user.friends?.find((friend) => friend._id === friendId)

        if (isFriend) return { success: false, error: 'User is already your friend' }

        user.friends?.push(friend)

        return { success: true, friend }
    }

    async getAllFriends(userId: string): Promise<UserFriend[] | []> {
        const user = this.users.find((user) => user._id === userId)
        return user?.friends ?? []
    }

    async getAllFriendsRequests(userId: string): Promise<UserFriend[] | []> {
        const user = this.users.find((user) => user._id === userId)
        return user?.friendsRequests || []
    }

    async sentFriendRequest(senderId: string, receiverId: string): Promise<FriendOperationResult> {
        const sender = this.users.find((user) => user._id === senderId)
        const receiver = this.users.find((user) => user._id === receiverId)

        if (!sender || !receiver) return { success: false, error: 'User not found' }

        const isFriend = sender.friends?.find((friend) => friend._id === receiverId)

        if (isFriend) return { success: false, error: 'User is already your friend' }

        const isFriendRequest = sender.friendsRequests?.find((friend) => friend._id === receiverId)

        if (isFriendRequest) return { success: false, error: 'User already sent a friend request' }

        sender.friendsRequests?.push(receiver)

        return { success: true, friend: receiver }
    }
}
