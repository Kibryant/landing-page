import Task from '@/core/task/entity/Task'

describe('Task', () => {
    describe('create', () => {
        it('should create a new task', () => {
            const task = Task.create({
                task: 'task',
                content: 'description',
                authorId: 'authorId',
                dayToFinishTheTask: new Date(),
                howMuchTimeIsLeft: new Date(),
            })

            expect(task).toBeInstanceOf(Task)
            expect(task.task).toBe('task')
            expect(task.content).toBe('description')
            expect(task.authorId).toBe('authorId')
            expect(task.dayToFinishTheTask).toBeInstanceOf(Date)
            expect(task.howMuchTimeIsLeft).toBeInstanceOf(Date)
            expect(task.id).toBeDefined()
        })
    })

    it('should create a new task with id', () => {
        const task = Task.create(
            {
                task: 'task',
                content: 'description',
                authorId: 'authorId',
                dayToFinishTheTask: new Date(),
                howMuchTimeIsLeft: new Date(),
            },
            'id',
        )

        expect(task).toBeInstanceOf(Task)
    })
})
