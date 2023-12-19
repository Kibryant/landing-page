import Entity from '@/core/shared/Entity'
import CreateTaskDto from '../dtos/CreateTaskDto'
import StringValidator from '@/core/shared/StringValidator'
import { THOUSAND_MILLISECONDS, SECONDS_IN_A_HOUR, HOURS_IN_A_DAY } from '@/constants'

interface TaskObject {
    id: string
    task: string
    content: string
    authorId: string
    dayToFinishTheTask: Date
    isDone: boolean
    createdAt: Date
    updatedAt: Date
}

export default class Task extends Entity {
    private _task: string
    private _content: string
    private _authorId: string
    private _dayToFinishTheTask: Date
    private _isDone = false
    private _createdAt: Date = new Date()
    private _updatedAt: Date = new Date()

    constructor({ task, content, dayToFinishTheTask, authorId }: CreateTaskDto, id?: string) {
        super(id)
        this._task = new StringValidator(task).input
        this._content = new StringValidator(content).input
        this._authorId = authorId
        this._dayToFinishTheTask = new Date(dayToFinishTheTask)
    }

    static create(props: CreateTaskDto, id?: string): Task {
        return new Task(props, id)
    }

    get task(): string {
        return this._task
    }

    get content(): string {
        return this._content
    }

    get authorId(): string {
        return this._authorId
    }

    get dayToFinishTheTask(): Date {
        return this._dayToFinishTheTask
    }

    get createdAt(): Date {
        return this._createdAt
    }

    get updatedAt(): Date {
        return this._updatedAt
    }

    get daysLeft(): number {
        const now = new Date()
        const diffInTime = this._dayToFinishTheTask.getTime() - now.getTime()
        const diffInDays = Math.ceil(diffInTime / (THOUSAND_MILLISECONDS * SECONDS_IN_A_HOUR * HOURS_IN_A_DAY))
        return diffInDays
    }

    get isDone(): boolean {
        return this._isDone
    }

    set isDone(value: boolean) {
        this._isDone = value
    }

    toObject(): TaskObject {
        const obj: TaskObject = {
            id: this._id,
            task: this.task,
            content: this.content,
            authorId: this.authorId,
            dayToFinishTheTask: this.dayToFinishTheTask,
            isDone: this.isDone,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }

        return obj
    }
}
