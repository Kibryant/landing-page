import User from '@/core/user/models/User'
import connect from '@/core/db'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { UserProps } from '@/types/UserProps'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    try {
        await connect()

        const { email, username, password } = await req.json()

        const user: UserProps | null = await User.findOne({ email, username })

        if (!user) {
            return NextResponse.json({
                error: true,
                message: `Credentials Invalid`,
                status: HttpStatusCode.NOT_FOUND,
                data: null,
            })
        }

        const validPassword = await bcrypt.compare(password, user.password)

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
