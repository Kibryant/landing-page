import { z } from 'zod'

const tasksSchema = z.object({
    task: z.string().min(1, 'Task must hava ate least 1 character.'),
    content: z.string().min(1, 'Content must hava ate least 1 character.'),
    dayToFinishTheTask: z.string().min(1, 'Day to finish the task must hava ate least 1 character.'),
})

type TaskInputSchema = z.input<typeof tasksSchema>

export type { TaskInputSchema }
export { tasksSchema }
