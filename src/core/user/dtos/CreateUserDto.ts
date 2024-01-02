import Message from '@/core/message/entity/Message'
import Task from '@/core/task/entity/Task'

export default interface CreateUserDto {
    email: string
    username: string
    password: string
    photoURL?: string
    tasks?: Task[]
    sentMessages?: Message[]
    receivedMessages?: Message[]
}
