import connect from '@/core/db'
import { authHeader } from '@/lib/auth'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'
import UserModel from '@/external/database/model/user/User'
import { TasksProps } from '@/types/UserProps'

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

    const user = await UserModel.findOne({ email })
    const body = await req.json()
    const { task, description, date }: TasksProps = body

    if (!user)
        return NextResponse.json({
            error: true,
            message: 'Error!',
            status: 500,
            data: undefined,
        })

    const newTask: TasksProps = {
        task,
        date,
        description,
    }

    await UserModel.findByIdAndUpdate(user.id, { $push: { tasks: newTask } }, { new: true })

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
