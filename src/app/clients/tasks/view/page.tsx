import TaskList from '@/components/Clients/Tasks'
import Task from '@/core/task/entity/Task'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { getUserCookies } from '@/utils'
import { headers } from 'next/headers'

const Page = async () => {
    const user = getUserCookies()
    const host = headers().get('host')
    const protocal = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const req = await fetch(`${protocal}://${host}/api/clients/tasks/${user?._id}`, {
        next: { revalidate: 10 },
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?._id}` },
    })

    if (req.status !== HttpStatusCode.OK) {
        return <div>Error in Fetch Tasks</div>
    }

    const res: { data: Task[] } = await req.json()

    if (!res.data) {
        return <div>No Tasks</div>
    }

    console.log(res.data)

    const tasks: Task[] = res.data
    return <TaskList tasks={tasks} />
}

export default Page
