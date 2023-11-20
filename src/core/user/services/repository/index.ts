import CreateTaskDto from '@/core/tasks/dtos/CreateTaskDto'
import CreateUserDto from '../../dtos/CreateUserDto'
import UpdateUserDto from '../../dtos/UpdateUserDto'
import User from '../../entity/User'
import Task from '@/core/tasks/model/Task'

export abstract class UserRepository {
    abstract getUserByEmail(email: string): Promise<User | null>
    abstract getUserById(id: string): Promise<User | null>
    abstract getUserByUsername(username: string): Promise<User | null>
    abstract createNewUser(user: CreateUserDto): Promise<User | null>
    abstract updateUser(userId: string, updatedFields: UpdateUserDto): Promise<User | null>
    abstract addNewTaskToUser(userId: string, task: CreateTaskDto): Promise<Task | null>
    abstract getAllTasksByUserId(userId: string): Promise<Task[] | null>
}
