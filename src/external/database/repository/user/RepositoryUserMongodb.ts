import { UserRepository } from '@/core/user/services/repository'
import { Db, MongoClient, Collection } from 'mongodb'
import CreateTaskDto from '@/core/task/dtos/CreateTaskDto'
import Task from '@/core/task/entity/Task'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import UpdateUserDto from '@/core/user/dtos/UpdateUserDto'
import User, { UserFriend } from '@/core/user/entity/User'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { FriendOperationResult } from '@/types/res/FriendOperation'
import { randomUUID } from 'crypto'

export class RepositoryUserMongo extends UserRepository {
    private client: MongoClient
    private db: Db
    private collection: Collection<User>

    constructor(client: MongoClient, db: string, collection: string) {
        super()
        this.client = client
        this.db = client.db(db)
        this.collection = this.db.collection(collection)
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.collection.findOne({ email })
        if (!user) {
            return null
        }

        return user
    }

    async getUserById(id: string): Promise<User | null> {
        const user = this.collection.findOne({ _id: id })

        if (!user) {
            return null
        }

        return user
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = this.collection.findOne({ username })

        if (!user) {
            return null
        }

        return user
    }

    async createNewUser({ email, password, username }: CreateUserDto): Promise<Response<User | null>> {
        const userEmailExists = await this.getUserByEmail(email)

        if (userEmailExists) {
            return new Response(null, 'User email exists', HttpStatusCode.CONFLICT)
        }

        const userUsernameExists = await this.getUserByUsername(username)

        if (userUsernameExists) {
            return new Response(null, 'User username exists', HttpStatusCode.CONFLICT)
        }

        const result = await this.collection.insertOne({
            _id: randomUUID(),
            email,
            password,
            username,
            createdAt: new Date(),
            tasks: [],
            friends: [],
            sentMessages: [],
            receivedMessages: [],
        })

        if (!result.acknowledged) {
            return new Response(null, 'Error on create new user', HttpStatusCode.INTERNAL_SERVER_ERROR)
        }

        const userId = result.insertedId

        const newUser = await this.collection.findOne({ _id: userId })

        if (!newUser) {
            return new Response(null, 'Error on create new user', HttpStatusCode.INTERNAL_SERVER_ERROR)
        }

        return new Response(newUser, 'User created with success', HttpStatusCode.CREATED)
    }

    async updateUser(userId: string, updatedFields: UpdateUserDto): Promise<User | null> {
        const updatedUser = await this.collection.findOneAndUpdate({ _id: userId }, { $set: updatedFields })

        return updatedUser
    }

    async addNewTaskToUser(userId: string, task: CreateTaskDto): Promise<Task | null> {
        const user = await this.getUserById(userId)

        if (!user) {
            return null
        }

        const newTask = Task.create({ ...task })

        const result = await this.collection.findOneAndUpdate({ _id: userId }, { $push: { tasks: newTask } })

        if (!result) {
            return null
        }

        return newTask
    }

    async getAllTasksByUserId(userId: string): Promise<Task[] | null> {
        console.log(userId)
        return Promise.resolve(null)
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
