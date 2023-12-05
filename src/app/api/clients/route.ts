import { GetAllUsers } from '@/core/user/services/GetAllUsers'
import { connectMongoDb } from '@/external/database/connections'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'

export async function GET() {
    await connectMongoDb()
    const repositoryUser = new RepositoryUserMongo()
    const getAllUsers = new GetAllUsers(repositoryUser)

    const users = await getAllUsers.exec()

    return NextResponse.json({
        message: 'All users',
        data: users,
        status: HttpStatusCode.OK,
    })
}
