import FriendRequests from '@/components/FriendRequests'
import { getUserCookies } from '@/utils/getUserCookies'

const Page = async () => {
    const user = getUserCookies()
    return (
        <main className="pt-8">
            <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
            <div className="flex flex-col gap-4">
                <FriendRequests currentUserId={user?._id ?? ''} currentUserEmail={user?.email ?? ''} />
            </div>
        </main>
    )
}

export default Page
