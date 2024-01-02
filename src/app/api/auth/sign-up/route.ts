import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import PasswordService from '@/external/security/hash/HashService'
import { connectMongoDb } from '@/external/database/connections'
import { ONE_WEEK_IN_MILLISECONDS, ONE_WEEK_IN_SECONDS, expirationTime } from '@/constants'
import JwtService from '@/external/security/jwt/JwtService'
import { getSecretKey } from '@/utils'
import { resend } from '@/external/mail/client'
import { Mail } from '@/components/Mail'

export async function POST(req: Request) {
    try {
        await connectMongoDb()

        const userRepository = new RepositoryUserMongo()
        const passwordService = new PasswordService()
        const createNewUser = new CreateNewUser(userRepository)
        const SECRET_KEY = getSecretKey()
        const jwtService = new JwtService(SECRET_KEY, expirationTime, 'HS256')

        const { email, username, password, photoURL } = await req.json()

        const hashedPassword = await passwordService.hashPassword(password)

        const { data, message, status } = await createNewUser.exec({
            email,
            username,
            password: hashedPassword,
            photoURL,
        })

        if (status !== HttpStatusCode.CREATED) {
            return NextResponse.json({
                error: true,
                status,
                message,
            })
        }

        const token = await jwtService.createToken()

        cookies().set(
            'client-system',
            JSON.stringify({
                data,
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

        await resend.emails.send({
            from: 'Landing Page <noanswer@lp.dev>',
            to: email,
            subject: '[Landing Page]',
            react: Mail({
                userEmail: email,
            }),
        })
        return NextResponse.json({
            message,
            status,
            error: false,
            data,
        })
    } catch (error) {
        return NextResponse.json({
            error: true,
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: `Error: ${error}`,
        })
    }
}
