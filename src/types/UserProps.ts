import { Document } from 'mongoose'

interface TasksProps {
    task?: string
    date?: Date
    description?: string
}
interface UserProps extends Document {
    email: string
    username: string
    password: string
    tasks: TasksProps | []
}

export type { UserProps, TasksProps }
