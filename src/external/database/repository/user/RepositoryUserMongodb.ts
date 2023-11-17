import { UserRepository } from '@/core/user/services/repository'
import { Db, MongoClient, Collection } from 'mongodb'
import CreateTaskDto from '@/core/tasks/dtos/CreateTaskDto'
import Task from '@/core/tasks/model/Task'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import UpdateUserDto from '@/core/user/dtos/UpdateUserDto'
import User from '@/core/user/models/User'
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
        const user = this.collection.findOne({ id })

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

    async createNewUser(user: CreateUserDto): Promise<User | null> {
        const result = await this.collection.insertOne({ ...user, id: randomUUID() })

        // Verifique se a inserção foi bem-sucedida
        if (!result.acknowledged) {
            return null
        }
        // Obtenha o ID gerado durante a inserção
        const userId = result.insertedId

        // Busque o usuário recém-criado usando o ID
        const newUser = await this.collection.findOne({ _id: userId })

        if (!newUser) {
            return null
        }

        return newUser
    }

    async updateUser(userId: string, updatedFields: UpdateUserDto): Promise<User | null> {
        const updatedUser = await this.collection.findOneAndUpdate({ id: userId }, { $set: updatedFields })

        return updatedUser
    }

    addNewTaskToUser(userId: string, task: CreateTaskDto): Promise<Task | null> {
        throw new Error('Method not implemented.')
    }

    getAllTasksByUserId(userId: string): Promise<Task[] | null> {
        throw new Error('Method not implemented.')
    }
}
