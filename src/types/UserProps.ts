import Task from '@/core/tasks/model/Task'
import { Document } from 'mongoose'

interface UserProps extends Document {
    email: string
    username: string
    password: string
    tasks: Task[]
}

export type { UserProps }
