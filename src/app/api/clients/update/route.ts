import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
import { UpdateUser } from '@/core/user/services/UpdateUser'
import { connectMongoDb } from '@/external/database/connections'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import HashService from '@/external/security/hash/HashService'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
    try {
        await connectMongoDb()

        const userRepository = new RepositoryUserMongo()
        const hashService = new HashService()
        const getUserByEmail = new GetUserByEmail(userRepository)
        const updateUser = new UpdateUser(userRepository)

        const body = await req.json()

        const { email, newEmail, newUsername, newPassword, currentPassword } = body

        const { data: user, message, status } = await getUserByEmail.exec(email)

        if (!user) {
            return NextResponse.json({
                erro: true,
                message,
                status,
                data: user,
            })
        }

        const validPassword = await hashService.comparePassword(currentPassword, user.password)

        if (!validPassword) {
            return NextResponse.json({
                erro: true,
                message: 'The current password is not equal!',
                status: HttpStatusCode.CONFLICT,
                data: user,
            })
        }

        const {
            data,
            message: messageFromUpdate,
            status: statusFromUpdate,
        } = await updateUser.exec([
            user.id ?? '',
            {
                email: newEmail,
                username: newUsername,
                password: newPassword,
            },
        ])

        if (!data) {
            return NextResponse.json({
                messageFromUpdate,
                statusFromUpdate,
                data,
            })
        }

        return NextResponse.json({
            data,
            messageFromUpdate,
            statusFromUpdate,
        })
    } catch {
        return NextResponse.json({
            erro: true,
            message: 'Erro interno do servidor',
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        })
    }
}
