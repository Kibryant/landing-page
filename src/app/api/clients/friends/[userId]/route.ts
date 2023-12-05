import GetUserById from '@/core/user/services/GetUserById'
import { connectMongoDb } from '@/external/database/connections'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params: { userId } }: { params: { userId: string } }) {
    await connectMongoDb()
    const userRepository = new RepositoryUserMongo()
    const getUserById = new GetUserById(userRepository)

    const user = await getUserById.exec(userId)

    if (!user) {
        return NextResponse.json({
            error: true,
            message: 'User not found',
            status: HttpStatusCode.NOT_FOUND,
            data: null,
        })
    }

    return NextResponse.json({
        error: false,
        message: 'User found',
        status: HttpStatusCode.OK,
        data: user.friends,
    })
}
