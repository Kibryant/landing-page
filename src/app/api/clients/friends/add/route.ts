import { pusherServer } from '@/lib/pusher'
import { toPusherKey } from '@/utils/toPusherKey'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { senderId, senderEmail, email } = await req.json()

        console.log('emailToAdd', email)

        await pusherServer.trigger(
            toPusherKey(`user:${senderId}:incoming_friend_requests`),
            'incoming_friend_requests',
            {
                senderId,
                senderEmail,
            },
        )

        return NextResponse.json({
            message: 'Friend request sent',
            error: false,
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: 'Error sending friend request',
            error: true,
            status: 500,
        })
    }
}
