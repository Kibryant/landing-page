import Message from '@/core/messages/entity/Message'
import Task from '@/core/tasks/model/Task'

export default interface CreateUserDto {
    email: string
    username: string
    password: string
    tasks?: Task[]
    sentMessages?: Message[]
    receivedMessages?: Message[]
}
