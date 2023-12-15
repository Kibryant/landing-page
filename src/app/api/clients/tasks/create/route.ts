import { authHeader } from '@/lib/auth'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'
import { connectMongoDb } from '@/external/database/connections'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import AddNewTaskToUser from '@/core/user/services/AddNewTaskToUser'
import CreateTaskDto from '@/core/task/dtos/CreateTaskDto'
import Task from '@/core/task/entity/Task'

export async function POST(req: Request) {
    await connectMongoDb()
    const repositoryUser = new RepositoryUserMongo()
    const addNewTaskToUser = new AddNewTaskToUser(repositoryUser)

    const isAuth = authHeader()
    if (!isAuth) {
        return NextResponse.json({
            error: true,
            message: 'Unauthorized!',
            status: HttpStatusCode.UNAUTHORIZED,
            data: undefined,
        })
    }

    const body = await req.json()
    console.log(body)
    const { authorId, content, dayToFinishTheTask, task }: CreateTaskDto = body

    const newTask = new Task({
        authorId,
        content,
        dayToFinishTheTask,
        task,
    })

    const { success, error, task: taskCreated } = await addNewTaskToUser.exec([authorId, newTask])

    if (!success) {
        return NextResponse.json({
            error: true,
            message: error,
            status: HttpStatusCode.BAD_REQUEST,
            data: undefined,
        })
    }

    return NextResponse.json({
        message: 'Task successfully registered!',
        status: 201,
        error: false,
        data: {
            taskCreated,
        },
    })
}
