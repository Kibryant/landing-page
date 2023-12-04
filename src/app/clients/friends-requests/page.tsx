import FriendRequests from '@/components/FriendRequests'

const Page = async () => {
    return (
        <main className="pt-8">
            <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
            <div className="flex flex-col gap-4">
                <FriendRequests sessionId={`1`} />
            </div>
        </main>
    )
}

export default Page
