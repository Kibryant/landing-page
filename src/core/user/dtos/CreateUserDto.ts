import Task from '@/core/tasks/model/Task'

export default interface CreateUserDto {
    email: string
    username: string
    password: string
    tasks?: Task[]
}
