import { NextResponse } from 'next/server'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { cookies } from 'next/headers'
import { connectMongoDb } from '@/external/database/connections'
import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongo'
import HashService from '@/external/security/hash/HashService'

export async function POST(req: Request) {
    try {
        await connectMongoDb()

        const repositoryUserMongo = new RepositoryUserMongo()
        const hashService = new HashService()

        const getUserByEmail = new GetUserByEmail(repositoryUserMongo)

        const { email, password } = await req.json()

        const { data: user, message, status } = await getUserByEmail.exec(email)

        if (!user) {
            return NextResponse.json({
                error: true,
                message,
                status,
                data: null,
            })
        }

        const validPassword = await hashService.comparePassword(password, user.password)

        if (!validPassword) {
            return NextResponse.json({
                erro: true,
                message: 'Credentials Invalid',
                status: HttpStatusCode.NOT_FOUND,
                data: user,
            })
        }

        cookies().set(
            'client-system',
            JSON.stringify({
                username: user.username,
                email: user.password,
            }),
        )

        return NextResponse.json({
            erro: false,
            message: 'User Found!',
            status: HttpStatusCode.OK,
            data: user,
        })
    } catch (error) {
        return NextResponse.json({
            error: `"Error! ${error}`,
            status: 500,
        })
    }
}
