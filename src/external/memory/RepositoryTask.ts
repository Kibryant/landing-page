import UpdateTaskDto from '@/core/tasks/dtos/UpdateTaskDto'
import Task from '@/core/tasks/model/Task'
import { TaskRepository } from '@/core/tasks/services/repository'

export default class RepositoryTaskMemory implements TaskRepository {
    private readonly tasks: Task[] = []

    async getTaskById(taskId: string): Promise<Task | null> {
        const task = this.tasks.find((t) => t._id === taskId)
        return task || null
    }

    async createNewTask(task: Task): Promise<Task> {
        const newTask: Task = { ...task, _id: 'fake id' }
        this.tasks.push(newTask)
        return newTask
    }

    async updateTask(taskId: string, task: UpdateTaskDto): Promise<Task | null> {
        const index = this.tasks.findIndex((t) => t.id === taskId)
        if (index === -1) return null
        const updatedTask = { ...this.tasks[index], ...task }
        this.tasks[index] = updatedTask
        return updatedTask
    }

    async deleteTask(taskId: string): Promise<Task | null> {
        const index = this.tasks.findIndex((t) => t._id === taskId)
        if (index !== -1) {
            const deletedTask = this.tasks.splice(index, 1)[0]
            return deletedTask || null
        }
        return null
    }

    async getAllTasks(): Promise<Task[] | null> {
        return [...this.tasks]
    }

    async getTaskByName(taskName: string): Promise<Task | null> {
        const task = this.tasks.find((t) => t.task === taskName)
        return task || null
    }
}
