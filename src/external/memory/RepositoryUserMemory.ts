import Message from '@/core/messages/entity/Message'
import CreateTaskDto from '@/core/tasks/dtos/CreateTaskDto'
import Task from '@/core/tasks/model/Task'
import UpdateUserDto from '@/core/user/dtos/UpdateUserDto'
import User from '@/core/user/entity/User'
import { UserRepository } from '@/core/user/services/repository'
import { FriendOperationResult } from '@/types/res/FriendOperation'
import { randomUUID } from 'node:crypto'

export default class RepositoryUserMemory implements UserRepository {
    private readonly users: User[] = []

    async createNewUser(user: User): Promise<User> {
        const newUser: User = {
            ...user,
            friends: [],
            tasks: [],
            friendsRequests: [],
            id: randomUUID(),
            _id: randomUUID(),
            createdAt: new Date(),
            receivedMessages: [],
            sentMessages: [],
        }

        this.users.push(newUser)
        return newUser
    }

    async updateUser(userId: string, updatedFields: UpdateUserDto): Promise<User | null> {
        const index = this.users.findIndex((user) => user.id === userId)
        if (index === -1) return null
        const updatedUser = { ...this.users[index], ...updatedFields }
        this.users[index] = updatedUser
        return updatedUser
    }

    async getAllTasksByUserId(userId: string): Promise<Task[] | null> {
        const user = this.users.find((user) => user.id === userId)
        if (!user) {
            return null
        }

        return user.tasks ?? null
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = this.users.find((user) => user.email === email)
        return user ?? null
    }

    async getUserById(id: string): Promise<User | null> {
        const user = this.users.find((user) => user.id === id)
        return user ?? null
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = this.users.find((user) => user.username === username)
        return user ?? null
    }

    async addNewTaskToUser(userId: string, task: CreateTaskDto): Promise<Task | null> {
        const userIndex = this.users.findIndex((user) => user.id === userId)

        if (userIndex === -1) {
            return null
        }

        const newTask = { ...task, _id: randomUUID() }

        this.users[userIndex].tasks?.push(newTask)

        return newTask
    }

    async getAllMessagesByUserId(userId: string): Promise<Message[] | null> {
        const user = this.users.find((user) => user.id === userId)
        return user?.receivedMessages ?? null
    }

    async sentMessageToAnotherUser(senderId: string, receiverId: string, content: string): Promise<boolean> {
        const sender = this.users.find((user) => user.id === senderId)
        const receiver = this.users.find((user) => user.id === receiverId)

        if (!sender || !receiver) {
            return false
        }

        const message = new Message({
            content,
            receiverId,
            senderId,
            createdAt: new Date(),
        })

        sender.sentMessages?.push(message)

        console.log(sender)

        receiver.receivedMessages?.push(message)

        return true
    }

    async receivedMessages(receiverId: string): Promise<Message[] | null> {
        const user = this.users.find((user) => user.id === receiverId)
        return user?.receivedMessages ?? null
    }

    async getAllUsers(): Promise<User[] | null> {
        const users = this.users
        return users ?? null
    }

    async addNewFriend(userId: string, friendId: string): Promise<FriendOperationResult> {
        const friend = this.users.find((user) => user.id === friendId)
        const user = this.users.find((user) => user.id === userId)

        if (!user || !friend) return { success: false, error: 'User not found' }

        const isFriend = user.friends?.find((friend) => friend.id === friendId)

        if (isFriend) return { success: false, error: 'User is already your friend' }

        user.friends?.push(friend)

        return { success: true, friend }
    }

    async getAllFriends(userId: string): Promise<User[] | []> {
        const user = this.users.find((user) => user.id === userId)
        return user?.friends ?? []
    }

    async getAllFriendsRequests(userId: string): Promise<User[] | []> {
        const user = this.users.find((user) => user.id === userId)
        return user?.friendsRequests ?? []
    }

    async sentFriendRequest(senderId: string, receiverId: string): Promise<FriendOperationResult> {
        const sender = this.users.find((user) => user.id === senderId)
        const receiver = this.users.find((user) => user.id === receiverId)

        if (!sender || !receiver) return { success: false, error: 'User not found' }

        const isFriend = sender.friends?.find((friend) => friend.id === receiverId)

        if (isFriend) return { success: false, error: 'User is already your friend' }

        const isFriendRequest = sender.friendsRequests?.find((friend) => friend.id === receiverId)

        if (isFriendRequest) return { success: false, error: 'User already sent a friend request' }

        sender.friendsRequests?.push(receiver)

        return { success: true, friend: receiver }
    }
}
