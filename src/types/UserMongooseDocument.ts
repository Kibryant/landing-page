import Message from '@/core/messages/entity/Message'
import Task from '@/core/tasks/model/Task'
import User, { UserFriend } from '@/core/user/entity/User'
import { Document } from 'mongoose'

interface UserMongooseDocument extends Document {
    _id?: string
    email: string
    username: string
    password: string
    tasks: Task[]
    sentMessages: Message[]
    receivedMessages: Message[]
    friends: UserFriend[]
    friendsRequests: UserFriend[]
}

export type { UserMongooseDocument }
