import User from '@/core/user/entity/User'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { capitalizeFirstLetter, chatHrefConstructor } from '@/utils'
import { User2Icon } from 'lucide-react'
import { cookies as cookiesNext, headers } from 'next/headers'
import Link from 'next/link'

const Page = async () => {
    const getFriends = async (userId: string): Promise<User[]> => {
        const host = headers().get('host')
        const protocal = process.env.NODE_ENV === 'development' ? 'http' : 'https'
        const req = await fetch(`${protocal}://${host}/api/clients/friends/${userId}`, {
            next: { revalidate: 100 },
            method: 'GET',
        })

        const res = await req.json()

        if (res.status !== HttpStatusCode.OK) throw new Error('Error')

        return res.data
    }

    const cookies = cookiesNext()
    const userCookies = cookies.get('client-system')?.value

    if (!userCookies) return <div>Loading...</div>

    const user: User = await JSON.parse(userCookies)

    const userFriends = await getFriends(user._id ?? '')

    return (
        <div className="grid mt-10 grid-cols-2 md:grid-cols-4 gap-4">
            {userFriends.map((friend) => (
                <Link
                    key={friend._id}
                    href={`/clients/chat/${chatHrefConstructor(user._id ?? '', friend._id ?? '')}`}
                    className="p-4 rounded-lg shadow-md hover:bg-primary hover:text-primary-foreground transition duration-300 ease-in-out text-center text-xl font-semibold bg-secondary-foreground text-secondary"
                >
                    <User2Icon className="w-10 h-10 mx-auto" />
                    <p className="text-center font-semibold">{capitalizeFirstLetter(friend.username)}</p>
                </Link>
            ))}
        </div>
    )
}

export default Page
