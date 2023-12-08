import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import PasswordService from '@/external/security/hash/HashService'
import { connectMongoDb } from '@/external/database/connections'

export async function POST(req: Request) {
    try {
        await connectMongoDb()

        const userRepository = new RepositoryUserMongo()
        const passwordService = new PasswordService()
        const createNewUser = new CreateNewUser(userRepository)

        const { email, username, password } = await req.json()

        const hashedPassword = await passwordService.hashPassword(password)

        // const newUser: UserMongooseDocument = new User({
        //     email,
        //     username,
        //     password: hashedPassword,
        //     tasks: [],
        // })

        // await newUser.save()

        const { data, message, status } = await createNewUser.exec({
            email,
            username,
            password: hashedPassword,
        })

        cookies().set(
            'client-system',
            JSON.stringify({
                ...data,
            }),
            {
                httpOnly: true,
            },
        )

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
