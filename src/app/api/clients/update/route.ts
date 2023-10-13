import { saltOrRounds } from '@/app/constants'
import connect from '@/core/db'
import User from '@/core/user/models/User'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { UserProps } from '@/types/UserProps'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
    try {
        await connect()

        const body = await req.json()

        console.log(body)

        const { email, newEmail, newUsername, newPassword, currentPassword } = body

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                erro: true,
                message: 'Credentials Invalid',
                status: HttpStatusCode.NOT_FOUND,
                data: user,
            })
        }

        const validPassword = await bcrypt.compare(currentPassword, user.password)

        console.log(validPassword)

        if (!validPassword) {
            return NextResponse.json({
                erro: true,
                message: 'The current password is not equal!',
                status: HttpStatusCode.CONFLICT,
                data: user,
            })
        }

        const updatedFields: { nome?: string; username?: string; email?: string; password?: string } = {}

        if (newEmail !== email) {
            updatedFields.email = newEmail
        }

        if (newUsername !== user?.username) {
            updatedFields.username = newUsername
        }

        if (newPassword.length === 0) {
            updatedFields.password = user?.password

            console.log(updatedFields)

            const updatedUser = await User.findByIdAndUpdate(user.id, updatedFields, { new: true })

            console.log(updatedUser)

            return NextResponse.json({
                status: HttpStatusCode.OK,
                message: 'Updated',
                data: updatedUser,
            })
        } else {
            const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds)

            updatedFields.password = hashedPassword

            console.log(updatedFields)

            const updatedUser = await User.findByIdAndUpdate(user.id, updatedFields, { new: true })
            console.log(updatedUser)

            return NextResponse.json({
                status: HttpStatusCode.OK,
                message: 'Updated',
                data: updatedUser,
            })
        }
    } catch {
        return NextResponse.json({
            erro: true,
            message: 'Erro interno do servidor',
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        })
    }
}
