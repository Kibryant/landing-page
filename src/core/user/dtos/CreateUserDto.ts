import { TasksProps } from '@/types/UserProps'

export default interface CreateUserDto {
    email: string
    username: string
    password: string
    tasks?: TasksProps[]
}
