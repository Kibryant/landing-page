'use client'

import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/utils/toPusherKey'
import axios from 'axios'
import { Check, UserPlus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface IncomingFriendRequest {
    senderId: string
    senderEmail: string | null | undefined
}

interface FriendRequestsProps {
    currentUserEmail: string
    currentUserId: string
}

const FriendRequests: FC<FriendRequestsProps> = ({ currentUserEmail, currentUserId }) => {
    const router = useRouter()
    const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>([])
    console.log('friendRequests', friendRequests)
    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`user:${currentUserEmail}:incoming_friend_requests`))
        console.log('listening to ', `user:${currentUserEmail}:incoming_friend_requests`)

        const friendRequestHandler = ({ senderId, senderEmail }: IncomingFriendRequest) => {
            console.log('function got called')
            setFriendRequests((prev) => [...prev, { senderId, senderEmail }])
        }

        pusherClient.bind('incoming_friend_requests', friendRequestHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`user:${currentUserEmail}:incoming_friend_requests`))
            pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
        }
    }, [currentUserEmail])

    const acceptFriend = async (senderId: string) => {
        await axios.post('/api/clients/friends/accept', { id: senderId, currentUserId })

        setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId))

        router.refresh()
    }

    const denyFriend = async (senderId: string) => {
        await axios.post('/api/clients/friends/deny', { id: senderId })

        setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId))

        router.refresh()
    }

    return (
        <>
            {friendRequests.length === 0 ? (
                <p className="text-sm text-zinc-500">Nothing to show here...</p>
            ) : (
                friendRequests.map((request) => (
                    <div key={request.senderId} className="flex gap-4 items-center">
                        <UserPlus className="text-black" />
                        <p className="font-medium text-lg">{request.senderEmail}</p>
                        <button
                            onClick={() => acceptFriend(request.senderId)}
                            aria-label="accept friend"
                            className="w-8 h-8 bg-primary hover:bg-primary/80 grid place-items-center rounded-full transition hover:shadow-md"
                        >
                            <Check className="font-semibold text-white w-3/4 h-3/4" />
                        </button>

                        <button
                            onClick={() => denyFriend(request.senderId)}
                            aria-label="deny friend"
                            className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
                        >
                            <X className="font-semibold text-white w-3/4 h-3/4" />
                        </button>
                    </div>
                ))
            )}
        </>
    )
}

export default FriendRequests
