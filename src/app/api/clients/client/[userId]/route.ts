import GetUserById from '@/core/user/services/GetUserById'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongo'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params: { userId } }: { params: { userId: string } }) {
    const repositoryUser = new RepositoryUserMongo()
    const getUserById = new GetUserById(repositoryUser)

    const user = await getUserById.exec(userId)

    if (!user) {
        return NextResponse.json({
            message: 'User not found',
            data: null,
            error: true,
            status: HttpStatusCode.NOT_FOUND,
        })
    }

    return NextResponse.json({
        message: 'User created',
        data: user,
        error: false,
        status: HttpStatusCode.OK,
    })
}
