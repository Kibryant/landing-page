import { NextResponse } from 'next/server'
import connect from '@/core/db'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import { MongooseUserRepository } from '@/external/database/RepositoryUserMongo'
import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
import { GetUserByUsername } from '@/core/user/services/GetUserByUsername'
import PasswordService from '@/external/security/PasswordHashService'

export async function POST(req: Request) {
    try {
        const userRepository = new MongooseUserRepository()
        const passwordService = new PasswordService()

        const createNewUser = new CreateNewUser(userRepository)
        const getUserByEmail = new GetUserByEmail(userRepository)
        const getUserByUsername = new GetUserByUsername(userRepository)

        const { email, username, password } = await req.json()

        await connect()
        // const emailExists = await User.findOne({ email })
        const responseOfGetUserByEmail = await getUserByEmail.exec(email)
        console.log(responseOfGetUserByEmail)
        // const usernameExists = await User.findOne({ username })
        const responseOfGetUserByUsername = await getUserByUsername.exec(username)
        console.log(responseOfGetUserByUsername)

        if (responseOfGetUserByEmail.data)
            return NextResponse.json({
                message: 'E-mail already registered. Try again!',
                error: true,
                status: HttpStatusCode.CONFLICT,
            })

        if (responseOfGetUserByUsername.data)
            return NextResponse.json({
                message: 'Username already exits. Try again!',
                error: true,
                status: HttpStatusCode.CONFLICT,
            })

        const hashedPassword = await passwordService.hashPassword(password)

        // const newUser: UserProps = new User({
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

        if (!data) {
            return NextResponse.json({
                data,
                message,
                status,
            })
        }

        cookies().set(
            'client-system',
            JSON.stringify({
                username: data.username,
                email: data.email,
            }),
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
