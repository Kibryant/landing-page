import Message from '@/core/message/entity/Message'
import Task from '@/core/task/entity/Task'

export interface UserFriend {
    _id?: string
    username: string
    email: string
}

export default interface User {
    _id?: string
    username: string
    email: string
    password: string
    tasks?: Task[]
    friends?: UserFriend[]
    friendsRequests?: UserFriend[]
    createdAt?: Date
    updatedAt?: Date
    sentMessages?: Message[]
    receivedMessages?: Message[]
}
