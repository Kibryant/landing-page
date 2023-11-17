/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongodb'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'

describe('RepositoryUserMongo', () => {
    let client: MongoClient
    let mongoServer: MongoMemoryServer
    let repository: RepositoryUserMongo

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()
        client = await MongoClient.connect(mongoServer.getUri(), {})
        repository = new RepositoryUserMongo(client, mongoServer.instanceInfo!.dbName, 'test')
    })

    afterAll(async () => {
        if (client) {
            await client.close()
        }
        if (mongoServer) {
            await mongoServer.stop()
        }
    })

    test('createNewUser should create a new user', async () => {
        const createNewUser = new CreateNewUser(repository)
        const userDto: CreateUserDto = {
            email: 'arthur@gmail.com',
            password: '123456789',
            username: 'arthur',
            tasks: [],
        }
        const { data } = await createNewUser.exec(userDto)

        expect(data).toBeDefined()
        expect(data?.email).toBe(userDto.email)
    })
})
