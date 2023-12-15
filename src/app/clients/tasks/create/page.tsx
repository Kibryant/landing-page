'use client'

import { Section } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TaskInputSchema, tasksSchema } from '@/schemas/zod/tasksSchema'
import { ResProps } from '@/types/ResProps'
import { getUserLocalStorage } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

const Tasks = () => {
    const user = getUserLocalStorage()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskInputSchema>({
        resolver: zodResolver(tasksSchema),
    })

    const handleSubmitTasks: SubmitHandler<TaskInputSchema> = async ({ task, content, dayToFinishTheTask }) => {
        const formatedDate = new Date(dayToFinishTheTask)

        try {
            await fetch(`/api/clients/tasks/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user?.id}`,
                },
                body: JSON.stringify({
                    task,
                    content,
                    dayToFinishTheTask: formatedDate,
                    authorId: user?._id,
                }),
            }).then(async (response) => {
                const res: ResProps = await response.json()

                if (res.status !== 201) {
                    // setMessageErro(res.message);
                    console.log(res.message)
                    return
                }

                console.log('sucesso')

                // setSuccessMessage(res.message);
            })
        } catch (err) {
            // handleError(`Error: ${error}`);
            console.log(err)
        }
    }

    return (
        <Section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Task Form</h2>
            <form
                className="w-full max-w-md border border-secondary rounded-lg shadow-lg p-8"
                onSubmit={handleSubmit(handleSubmitTasks)}
            >
                <div className="mb-4">
                    <Label htmlFor="task">Task Name</Label>
                    <Input
                        {...register('task')}
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-primary"
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        {...register('content')}
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-primary"
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="date">Due Date</Label>
                    <Input
                        {...register('dayToFinishTheTask')}
                        type="date"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-primary"
                    />
                    {!!errors.dayToFinishTheTask?.message && (
                        <span className="text-sm text-red-500">{errors.dayToFinishTheTask.message}</span>
                    )}
                </div>
                <div className="mt-6">
                    <Button type="submit" className="focus:outline-none">
                        Save Task
                    </Button>
                </div>
            </form>
        </Section>
    )
}

export default Tasks
