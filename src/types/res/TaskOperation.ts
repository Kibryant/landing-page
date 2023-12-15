import Task from '@/core/task/entity/Task'

export default interface TaskOperationResult<T extends Task | Task[]> {
    success: boolean
    task?: T
    error?: string
}
