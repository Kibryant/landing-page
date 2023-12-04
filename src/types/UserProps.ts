import Message from '@/core/messages/entity/Message'
import Task from '@/core/tasks/model/Task'
import { Document } from 'mongoose'

interface UserProps extends Document {
    _id?: string
    email: string
    username: string
    password: string
    tasks: Task[]
    sentMessages: Message[]
    receivedMessages: Message[]
}

export type { UserProps }
