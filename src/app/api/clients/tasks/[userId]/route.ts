import GetAllTasksByUserId from '@/core/user/services/GetAllTasksByUserId'
import { connectMongoDb } from '@/external/database/connections'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import { authHeader } from '@/lib/auth'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params: { userId } }: { params: { userId: string } }) {
    await connectMongoDb()

    const isAuth = authHeader()

    if (!isAuth) {
        return NextResponse.json({
            error: true,
            message: 'Unauthorized!',
            status: HttpStatusCode.UNAUTHORIZED,
            data: undefined,
        })
    }

    const repositoryUserMongo = new RepositoryUserMongo()
    const getAllTasksByUserId = new GetAllTasksByUserId(repositoryUserMongo)

    const { success, error, task: tasks } = await getAllTasksByUserId.exec(userId)

    if (!success) {
        return NextResponse.json({
            error: true,
            message: error,
            status: HttpStatusCode.BAD_REQUEST,
            data: undefined,
        })
    }

    return NextResponse.json({
        message: 'Tasks successfully fetched!',
        status: 200,
        error: false,
        data: tasks,
    })
}
