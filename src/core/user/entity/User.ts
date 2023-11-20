import Task from '@/core/tasks/model/Task'

export default interface User {
    id?: string
    username: string
    email: string
    password: string
    tasks?: Task[]
    createdAt?: Date
    updatedAt?: Date
}
