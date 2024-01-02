import TaskList from '@/components/Clients/Tasks'
import { Section } from '@/components/Section'
import Task from '@/core/task/entity/Task'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { getUserCookies } from '@/utils/getUserCookies'
import { headers } from 'next/headers'

const Page = async () => {
    const user = getUserCookies()
    const host = headers().get('host')
    const protocal = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const req = await fetch(`${protocal}://${host}/api/clients/tasks/${user?._id}`, {
        next: { revalidate: 100 },
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?._id}` },
    })

    if (req.status !== HttpStatusCode.OK) {
        return <div>Error in Fetch Tasks</div>
    }

    const res: { data: Task[] } = await req.json()

    if (!res.data) {
        return <div>No Tasks</div>
    }

    const tasks: Task[] = res.data
    return (
        <Section>
            <TaskList tasks={tasks} />
        </Section>
    )
}

export default Page
