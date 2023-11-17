import UpdateTaskDto from '../../dtos/UpdateTaskDto'
import Task from '../../model/Task'

export abstract class TaskRepository {
    abstract getTaskById(taskId: string): Promise<Task | null>
    abstract createNewTask(task: Task): Promise<Task>
    abstract updateTask(taskId: string, task: UpdateTaskDto): Promise<Task | null>
    abstract deleteTask(taskId: string): Promise<Task | null>
    abstract getAllTasks(): Promise<Task[] | null>
    abstract getTaskByName(task: string): Promise<Task | null>
}
