import Entity from '@/core/shared/Entity'
import CreateTaskDto from '../dtos/CreateTaskDto'

export default class Task extends Entity {
    private _task: string
    private _content: string
    private _authorId: string
    private _dayToFinishTheTask: Date
    private _howMuchTimeIsLeft: Date

    constructor({ task, content, dayToFinishTheTask, howMuchTimeIsLeft, authorId }: CreateTaskDto, id?: string) {
        super(id)
        this._task = task
        this._content = content
        this._authorId = authorId
        this._dayToFinishTheTask = dayToFinishTheTask
        this._howMuchTimeIsLeft = howMuchTimeIsLeft
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

    get howMuchTimeIsLeft(): Date {
        return this._howMuchTimeIsLeft
    }
}
