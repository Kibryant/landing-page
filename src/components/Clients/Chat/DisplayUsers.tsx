'use client'

import { Input } from '@/components/ui/input'
import User from '@/core/user/entity/User'
import { capitalizeFirstLetter, chatHrefConstructor } from '@/utils'
import Link from 'next/link'
import { useState, ChangeEvent, useEffect } from 'react'

interface Props {
    users: User[]
    sentUserId: string
}

const DisplayUsers = ({ users, sentUserId }: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
    const filterUsers = (word: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(word.target.value)
    }
    useEffect(() => {
        setFilteredUsers(users.filter((user) => capitalizeFirstLetter(user.username).includes(searchTerm)))
    }, [searchTerm, users])

    return (
        <>
            <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-x-3">
                <h1 className="text-3xl">Search for a user</h1>
                <Input className="max-w-xs" placeholder="Search..." onChange={filterUsers} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 w-full gap-3 overflow-x-hidden whitespace-break-spaces">
                {filteredUsers.map((user) => (
                    <Link
                        className="bg-primary px-2 py-4 rounded-md text-secondary-foreground text-xl"
                        href={`/clients/chat/${chatHrefConstructor(sentUserId, user._id ?? '')}?id=${user._id}`}
                        key={user._id}
                    >
                        {user.username}
                    </Link>
                ))}
            </div>
        </>
    )
}

export { DisplayUsers }
