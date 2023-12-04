import Message from '@/core/messages/entity/Message'
import CreateTaskDto from '@/core/tasks/dtos/CreateTaskDto'
import Task from '@/core/tasks/model/Task'
import UpdateUserDto from '@/core/user/dtos/UpdateUserDto'
import User from '@/core/user/entity/User'
import { UserRepository } from '@/core/user/services/repository'
import { randomUUID } from 'node:crypto'

export default class RepositoryUserMemory implements UserRepository {
    private readonly users: User[] = []

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

    async createNewUser(user: User): Promise<User> {
        const newUser = { ...user, id: randomUUID() }
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

    async addNewTaskToUser(userId: string, task: CreateTaskDto): Promise<Task | null> {
        const userIndex = this.users.findIndex((user) => user.id === userId)

        if (userIndex === -1) {
            return null
        }

        const newTask = { ...task, _id: randomUUID() }

        this.users[userIndex].tasks?.push(newTask)

        return newTask
    }

    getAllMessagesByUserId(userId: string): Promise<Message[] | null> {
        throw new Error('Method not implemented.')
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
}
