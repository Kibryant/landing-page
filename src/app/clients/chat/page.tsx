'use client'

import User from '@/core/user/entity/User'
import { getUserLocalStorage } from '@/utils'
import Link from 'next/link'
// import { headers } from 'next/headers'
import { useEffect, useState } from 'react'

export function chatHrefConstructor(id1: string, id2: string) {
    const sortedIds = [id1, id2].sort()
    return `${sortedIds[0]}--${sortedIds[1]}`
}

export default function Chat() {
    const [users, setUsers] = useState<User[]>([])
    const sentUser = getUserLocalStorage()

    useEffect(() => {
        getUsers()
    }, [])

    if (!sentUser) return <div>Loading...</div>

    const getUsers = async () => {
        // const host = headers().get('host')
        // const protocal = process.env.NODE_ENV === 'development' ? 'http' : 'https'
        const req = await fetch(`/api/clients`, { next: { revalidate: 100 } })

        if (req.status !== 200) {
            return <div>Error in Fetch products</div>
        }

        const res: { data: User[] } = await req.json()
        setUsers(res.data)
    }

    return (
        <div className="grid grid-cols-2 w-full gap-3 max-w-lg">
            {users.map((user) => (
                <Link
                    className="bg-primary px-2 py-4 rounded-md text-primary-foreground text-xl"
                    href={`/clients/chat/${chatHrefConstructor(sentUser._id!, user._id!)}?id=${user._id}`}
                    key={user._id}
                >
                    {user.username}
                </Link>
            ))}
        </div>
    )
}
