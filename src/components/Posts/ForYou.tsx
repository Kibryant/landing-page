import Link from 'next/link'
import { Profile } from './Profile'

const ForYou = () => {
    return (
        <div className="w-full flex flex-col border-t py-2">
            <div className="w-full flex justify-between">
                <span className="text-muted-foreground">For You</span>
                <Link href="/posts">See all</Link>
            </div>
            <div className="flex flex-col gap-y-3 mt-4">
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile />
            </div>
        </div>
    )
}

export { ForYou }
