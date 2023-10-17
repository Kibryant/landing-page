/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

describe('MongoDBUserRepository', () => {
    let con: MongoClient
    let mongoServer: MongoMemoryServer

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()
        con = await MongoClient.connect(mongoServer.getUri(), {})
    })

    afterAll(async () => {
        if (con) {
            await con.close()
        }
        if (mongoServer) {
            await mongoServer.stop()
        }
    })

    it('should connect to the in-memory MongoDB', async () => {
        const db = con.db(mongoServer.instanceInfo!.dbName)
        expect(db).toBeDefined()
    })

    it('should create a new user', async () => {
        const newUser = {
            email: 'test@example.com',
            username: 'testuser',
            password: 'testpassword',
            tasks: [],
        }

        const db = con.db(mongoServer.instanceInfo!.dbName)

        const col = db.collection('test')

        const result = await col.insertOne(newUser)
        expect(result.insertedId).toBeDefined()
    })

    it('should get a user by email', async () => {
        const db = con.db(mongoServer.instanceInfo!.dbName)
        const col = db.collection('test')

        const email = 'test@example.com'
        const user = await col.findOne({ email })
        expect(user).toBeDefined()
        expect(user?.email).toBe(email)
    })

    it('should update a user', async () => {
        const db = con.db(mongoServer.instanceInfo!.dbName)
        const col = db.collection('test')

        const email = 'test@example.com'
        const updatedUser = {
            $set: {
                email,
                username: 'updateduser',
                password: 'updatedpassword',
                tasks: ['task1', 'task2'],
            },
        }

        const query = { email }

        const result = await col.updateOne(query, updatedUser)

        expect(result).toBeDefined()
        expect(result.modifiedCount).toBe(1)
        const updateUser = await col.findOne({ email })
        expect(updateUser?.password).toBe('updatedpassword')
    })

    // it('should not find a user by email that does not exist', async () => {
    //     const email = 'nonexistent@example.com'
    //     expect(user).toBeNull()
    // })
})
