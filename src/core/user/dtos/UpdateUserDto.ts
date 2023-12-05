import Task from '@/core/tasks/model/Task'
import { UserFriend } from '../entity/User'

export default interface UpdateUserDto {
    email?: string
    username?: string
    password?: string
    friends?: UserFriend[]
    friendsRequests?: UserFriend[]
    tasks?: Task[]
}
