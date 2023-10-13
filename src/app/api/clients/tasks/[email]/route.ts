import connect from '@/core/db'
import { authHeader } from '@/lib/auth'
import User from '@/core/user/models/User'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { ResProps } from '@/types/class/Response'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params: { email } }: { params: { email: string } }) {
    const isAuth = authHeader()

    if (!isAuth) {
        return NextResponse.json({
            error: true,
            message: 'Unauthorized!',
            status: HttpStatusCode.UNAUTHORIZED,
            data: undefined,
        })
    }

    await connect()

    const user = await User.findOne({ email })
    const body = await req.json()
    console.log(body)
    const { task, description, date } = body

    if (!user)
        return NextResponse.json<ResProps>({
            error: true,
            message: 'Error!',
            status: 500,
            data: undefined,
        })

    user.tasks = {
        task,
        description,
        date,
    }

    await user.save()

    return NextResponse.json({
        message: 'Task successfully registered!',
        status: 201,
        error: false,
        data: {
            task,
            description,
            date,
        },
    })
}
