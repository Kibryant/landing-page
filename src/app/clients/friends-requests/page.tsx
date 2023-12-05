'use client'

import FriendRequests from '@/components/FriendRequests'
import { getUserLocalStorage } from '@/utils'

const Page = () => {
    const user = getUserLocalStorage()

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <main className="pt-8">
            <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
            <div className="flex flex-col gap-4">
                <FriendRequests currentUserId={user._id ?? ''} currentUserEmail={user.email} />
            </div>
        </main>
    )
}

export default Page
