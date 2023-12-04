import Message from '@/core/messages/entity/Message'
import Task from '@/core/tasks/model/Task'

export default interface User {
    _id?: string
    id?: string
    username: string
    email: string
    password: string
    tasks?: Task[]
    createdAt?: Date
    updatedAt?: Date
    sentMessages?: Message[]
    receivedMessages?: Message[]
}
