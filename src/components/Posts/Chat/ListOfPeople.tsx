import User from '@/core/user/entity/User'
import { Profile } from '../Profile'
import Link from 'next/link'
import { chatHrefConstructor } from '@/utils'

interface ListOfPeopleProps {
    users: User[]
    sentUserId: string
}

const ListOfPeople = ({ users, sentUserId }: ListOfPeopleProps) => {
    return (
        <>
            {users.map((user) => (
                <Link key={user._id} href={`/clients/posts/chat/${chatHrefConstructor(sentUserId, user._id || '')}`}>
                    <Profile user={user} />
                </Link>
            ))}
        </>
    )
}

export { ListOfPeople }
