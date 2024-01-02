import { NextResponse } from 'next/server'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { cookies } from 'next/headers'
import { connectMongoDb } from '@/external/database/connections'
import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import HashService from '@/external/security/hash/HashService'
import { ONE_WEEK_IN_MILLISECONDS, ONE_WEEK_IN_SECONDS, expirationTime } from '@/constants'
import JwtService from '@/external/security/jwt/JwtService'
import { getSecretKey } from '@/utils'

export async function POST(req: Request) {
    try {
        await connectMongoDb()

        const repositoryUserMongo = new RepositoryUserMongo()
        const hashService = new HashService()
        const getUserByEmail = new GetUserByEmail(repositoryUserMongo)
        const SECRET_KEY = getSecretKey()
        const jwtService = new JwtService(SECRET_KEY, expirationTime, 'HS256')

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

        const token = await jwtService.createToken()

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
            {
                httpOnly: true,
                expires: new Date(Date.now() + ONE_WEEK_IN_MILLISECONDS),
                maxAge: ONE_WEEK_IN_SECONDS,
            },
        )

        cookies().set('client-session-token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + ONE_WEEK_IN_MILLISECONDS),
            maxAge: ONE_WEEK_IN_SECONDS,
        })

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
