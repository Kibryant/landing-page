import { NextResponse } from 'next/server'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { cookies } from 'next/headers'
import { connectMongoDb } from '@/external/database/connections'
import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import HashService from '@/external/security/hash/HashService'

export async function POST(req: Request) {
    try {
        await connectMongoDb()

        const repositoryUserMongo = new RepositoryUserMongo()
        const hashService = new HashService()
        const getUserByEmail = new GetUserByEmail(repositoryUserMongo)

        const { email, password } = await req.json()

        const { data, message, status } = await getUserByEmail.exec(email)

        if (!data) {
            return NextResponse.json({
                message,
                status,
                data,
            })
        }

        const validPassword = await hashService.comparePassword(password, data.password)

        if (!validPassword) {
            return NextResponse.json({
                erro: true,
                message: 'Credentials Invalid',
                status: HttpStatusCode.NOT_FOUND,
                data,
            })
        }

        cookies().set(
            'client-system',
            JSON.stringify({
                _id: data._id,
                username: data.username,
                email: data.email,
                password: data.password,
                tasks: data.tasks,
                friends: data.friends,
                friendsRequests: data.friendsRequests,
                sentMessages: data.sentMessages,
                receivedMessages: data.receivedMessages,
            }),
        )

        return NextResponse.json({
            erro: false,
            message: 'User Found!',
            status: HttpStatusCode.OK,
            data,
        })
    } catch (error) {
        return NextResponse.json({
            error: `"Error! ${error}`,
            status: 500,
        })
    }
}
