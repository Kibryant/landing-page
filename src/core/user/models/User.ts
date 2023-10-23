import { TasksProps } from '@/types/UserProps'

export default interface User {
    id?: string
    username: string
    email: string
    password: string
    tasks?: TasksProps[] | []
    createdAt?: Date
    updatedAt?: Date
}
