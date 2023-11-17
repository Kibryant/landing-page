/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongodb'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'

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

    test('should return a user catched by email', async () => {
        const createNewUser = new CreateNewUser(repository)
        const getUserByEmail = new GetUserByEmail(repository)
        const userDto: CreateUserDto = {
            email: 'arthur@gmail.com',
            password: '123456789',
            username: 'arthur',
            tasks: [],
        }
        const { data: user } = await createNewUser.exec(userDto)
        const { data } = await getUserByEmail.exec(user?.email ?? '')

        expect(data?.email).toEqual(userDto.email)
    })
})
