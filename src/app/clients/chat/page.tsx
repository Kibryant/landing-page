import { DisplayUsers } from '@/components/Clients/Chat/DisplayUsers'
import { protocal, signal } from '@/constants'
import User from '@/core/user/entity/User'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { getUserCookies } from '@/utils/getUserCookies'
import { getUserSessionToken } from '@/utils/getUserSessionToken'
import { headers } from 'next/headers'

const getUsers = async () => {
    const host = headers().get('host')
    const token = getUserSessionToken()
    const req = await fetch(`${protocal}://${host}/api/clients`, {
        next: { revalidate: 1 },
        signal,
        headers: {
            'Content-Type': 'application/json',
            Cookie: `client-session-token=${token}`,
        },
        method: 'GET',
    })

    if (req.status !== HttpStatusCode.OK) {
        return []
    }

    const res: { data: User[] } = await req.json()
    if (!res.data) {
        return []
    }

    return res.data
}

const Page = async () => {
    const users: User[] = await getUsers()
    const sentUser = getUserCookies()
    const sentUserId = sentUser?._id ?? ''

    return (
        <div className="flex flex-col gap-y-3 mt-4">
            <DisplayUsers users={users} sentUserId={sentUserId} />
        </div>
    )
}

export default Page
