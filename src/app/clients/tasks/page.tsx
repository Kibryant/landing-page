'use client'

import { Section } from '@/components/Section'
import { TasksSchemaProps, tasksSchema } from '@/schemas/tasksSchema'
import { ResProps } from '@/types/ResProps'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

const Tasks = () => {
    const getLocalStorageItem = localStorage.getItem('client-system')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const email = JSON.parse(getLocalStorageItem!).email
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TasksSchemaProps>({
        resolver: zodResolver(tasksSchema),
    })

    const handleSubmitTasks: SubmitHandler<TasksSchemaProps> = async ({ task, description, date }) => {
        const formatedDate = new Date(date)

        try {
            await fetch(`/api/clients/tasks/${email}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${email}`,
                },
                body: JSON.stringify({
                    task,
                    description,
                    date: formatedDate,
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
                className="w-full max-w-md border rounded-lg shadow-lg p-8"
                onSubmit={handleSubmit(handleSubmitTasks)}
            >
                <div className="mb-4">
                    <label htmlFor="task" className="block text-gray-600 text-sm font-medium mb-2">
                        Task Name
                    </label>
                    <input
                        {...register('task')}
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-primary"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-600 text-sm font-medium mb-2">
                        Description
                    </label>
                    <input
                        {...register('description')}
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-primary"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-600 text-sm font-medium mb-2">
                        Due Date
                    </label>
                    <input
                        {...register('date')}
                        type="date"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-primary"
                    />
                    {!!errors.date?.message && <span className="text-sm text-red-500">{errors.date.message}</span>}
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded hover:bg-primary/80 focus:outline-none"
                    >
                        Save Task
                    </button>
                </div>
            </form>
        </Section>
    )
}

export default Tasks
