import Task from '@/core/task/entity/Task'

describe('Task', () => {
    describe('create', () => {
        it('should create a new task', () => {
            const task = Task.create({
                task: 'task',
                content: 'description',
                authorId: 'authorId',
                dayToFinishTheTask: new Date(),
            })

            expect(task).toBeInstanceOf(Task)
            expect(task.task).toBe('task')
            expect(task.content).toBe('description')
            expect(task.authorId).toBe('authorId')
            expect(task.dayToFinishTheTask).toBeInstanceOf(Date)
            expect(task.id).toBeDefined()
            expect(task.isDone).toBe(false)
            expect(task.createdAt).toBeInstanceOf(Date)
            expect(task.updatedAt).toBeInstanceOf(Date)
        })
    })

    it('should create a new task with id', () => {
        const task = Task.create(
            {
                task: 'task',
                content: 'description',
                authorId: 'authorId',
                dayToFinishTheTask: new Date(),
            },
            'id',
        )

        expect(task).toBeInstanceOf(Task)
        expect(task.task).toBe('task')
        expect(task.content).toBe('description')
        expect(task.authorId).toBe('authorId')
        expect(task.dayToFinishTheTask).toBeInstanceOf(Date)
        expect(task.id).toBe('id')
        expect(task.isDone).toBe(false)
    })

    it('should return days left', () => {
        const task = Task.create({
            task: 'task',
            content: 'description',
            authorId: 'authorId',
            dayToFinishTheTask: new Date('2023-12-30'),
        })

        expect(task.daysLeft).toBe(new Date(task.dayToFinishTheTask).getDate() - new Date().getDate() + 1)
    })

    it('should the task be done', () => {
        const task = Task.create({
            task: 'task',
            content: 'description',
            authorId: 'authorId',
            dayToFinishTheTask: new Date('2023-12-30'),
        })

        task.isDone = true

        expect(task.isDone).toBe(true)
    })

    it('should receive the object', () => {
        const task = Task.create({
            task: 'task',
            content: 'description',
            authorId: 'authorId',
            dayToFinishTheTask: new Date('2023-12-30'),
        })

        const object = task.toObject()
        expect(object.task).toBe('task')
        expect(object.content).toBe('description')
        expect(object.authorId).toBe('authorId')
    })
})
