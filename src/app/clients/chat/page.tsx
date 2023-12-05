'use client'

import { Input } from '@/components/ui/input'
import User from '@/core/user/entity/User'
import { capitalizeFirstLetter, getUserLocalStorage } from '@/utils'
import { chatHrefConstructor } from '@/utils/chatHrefConstructor'
import Link from 'next/link'
// import { headers } from 'next/headers'
import { ChangeEvent, useEffect, useState } from 'react'

export default function Chat() {
    const [users, setUsers] = useState<User[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])

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

    const sentUser = getUserLocalStorage()

    const filterUsers = (word: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(word.target.value)
    }
    useEffect(() => {
        setFilteredUsers(users.filter((user) => capitalizeFirstLetter(user.username).includes(searchTerm)))
    }, [searchTerm, users])

    useEffect(() => {
        getUsers()
    }, [])

    if (!sentUser) return <div>Loading...</div>

    return (
        <div className="flex flex-col gap-y-3 mt-4">
            <div className="flex gap-x-3">
                <h1 className="text-3xl">Search for a user</h1>
                <Input className="max-w-xs" placeholder="Search..." onChange={filterUsers} />
            </div>
            <div className="grid grid-cols-4 w-full gap-3">
                {filteredUsers.map((user) => (
                    <Link
                        className="bg-primary px-2 py-4 rounded-md text-secondary-foreground text-xl"
                        href={`/clients/chat/${chatHrefConstructor(sentUser._id ?? '', user._id ?? '')}?id=${user._id}`}
                        key={user._id}
                    >
                        {user.username}
                    </Link>
                ))}
            </div>
        </div>
    )
}
