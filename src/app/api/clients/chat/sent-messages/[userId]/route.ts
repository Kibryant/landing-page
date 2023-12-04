import GetAllMessagesByUserId from '@/core/user/services/GetAllMessagesByUserId'
import GetUserById from '@/core/user/services/GetUserById'
import { connectMongoDb } from '@/external/database/connections'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongo'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params: { userId } }: { params: { userId: string } }) {
    await connectMongoDb()
    const userRepository = new RepositoryUserMongo()
    const getUserById = new GetUserById(userRepository)
    const user = await getUserById.exec(userId)

    if (user === null) {
        return NextResponse.json({
            message: 'Error fetching messages',
            error: true,
            status: HttpStatusCode.BAD_REQUEST,
        })
    }

    return NextResponse.json({
        message: 'Messages fetched successfully',
        error: false,
        status: HttpStatusCode.OK,
        data: user.sentMessages,
    })
}
