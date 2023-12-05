import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
import GetUserById from '@/core/user/services/GetUserById'
import { UpdateUser } from '@/core/user/services/UpdateUser'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import { pusherServer } from '@/lib/pusher'
import { toPusherKey } from '@/utils/toPusherKey'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { senderId, senderEmail, email } = await req.json()

        const userRepository = new RepositoryUserMongo()
        const getUserById = new GetUserById(userRepository)
        const getUserByEmail = new GetUserByEmail(userRepository)
        const updateUser = new UpdateUser(userRepository)

        const sender = await getUserById.exec(senderId)
        console.log(sender)
        const { data: user } = await getUserByEmail.exec(email)

        if (!sender || !user) {
            return NextResponse.json({
                message: 'User not found',
                error: true,
                status: 404,
            })
        }

        const userFriends = user.friends

        const isAlreadyFriend = userFriends?.some((friend) => friend.email === senderEmail)

        if (isAlreadyFriend) {
            return NextResponse.json({
                message: 'You are already friends',
                error: true,
                status: 400,
            })
        }

        const isAlreadySentRequest = user.friendsRequests?.some((friend) => friend.email === senderEmail)

        if (isAlreadySentRequest) {
            return NextResponse.json({
                message: 'Friend request already sent',
                error: true,
                status: 400,
            })
        }

        await pusherServer.trigger(toPusherKey(`user:${email}:incoming_friend_requests`), 'incoming_friend_requests', {
            senderId,
            senderEmail,
        })

        sender.friendsRequests?.push({
            email,
            username: user.username,
        })

        await updateUser.exec([senderId, { friendsRequests: sender.friendsRequests }])

        console.log(sender)

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
