import Message from '@/core/messages/entity/Message'
import GetAllMessagesByUserId from '@/core/user/services/GetAllMessagesByUserId'
import { connectMongoDb } from '@/external/database/connections'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'
import UserModel from '@/external/database/model/user/UserModel'
import { pusherServer } from '@/lib/pusher'
import { toPusherKey } from '@/utils/toPusherKey'

export async function POST(req: Request) {
    // await connectMongoDb()
    const { message: content, senderId, receiverId, chatId } = await req.json()
    // const userRepository = new RepositoryUserMongo()
    // const getUserById = new GetUserById(userRepository)
    // const sender = await getUserById.exec(senderId)

    // if (!sender) {
    //     return NextResponse.json({
    //         message: 'Sender not found',
    //         error: true,
    //         status: HttpStatusCode.BAD_REQUEST,
    //     })
    // }

    // const receiver = await getUserById.exec(receiverId)

    // if (!receiver) {
    //     return NextResponse.json({
    //         message: 'Receiver not found',
    //         error: true,
    //         status: HttpStatusCode.BAD_REQUEST,
    //     })
    // }

    const sender = await UserModel.findById(senderId)

    if (!sender) {
        return NextResponse.json({
            message: 'Sender not found',
            error: true,
            status: HttpStatusCode.BAD_REQUEST,
        })
    }

    const receiver = await UserModel.findById(receiverId)

    if (!receiver) {
        return NextResponse.json({
            message: 'Receiver not found',
            error: true,
            status: HttpStatusCode.BAD_REQUEST,
        })
    }

    const message = new Message({ senderId, receiverId, content, createdAt: new Date() })

    await pusherServer.trigger(toPusherKey(`chat:${chatId}`), 'incoming-message', message)

    await pusherServer.trigger(toPusherKey(`user:${receiverId}:chats`), 'new_message', {
        ...message,
        senderId: sender._id,
        senderName: sender.username,
    })

    sender.sentMessages.push(message)
    receiver.receivedMessages.push(message)

    await sender.updateOne(sender)
    await receiver.updateOne(receiver)

    // const sentMessageToAnotherUser = new SentMessageToAnotherUser(userRepository)
    // // const message = new Message({ senderId, receiverId, content, createdAt: new Date() })
    // // sender.sentMessages?.push(message)
    // // receiver.receivedMessages?.push(message)

    // // await sender.save()
    // // await receiver.save()
    // const senderSentMessage = await sentMessageToAnotherUser.exec({ senderId, receiverId, content })

    // if (senderSentMessage === false) {
    //     return NextResponse.json({
    //         message: 'Error sending message to another user',
    //         error: true,
    //         status: HttpStatusCode.BAD_REQUEST,
    //     })
    // }

    return NextResponse.json({
        message: 'Message sent successfully',
        error: false,
        status: HttpStatusCode.OK,
        data: sender.sentMessages,
    })
}

export async function GET(req: Request, { params: { userId } }: { params: { userId: string } }) {
    await connectMongoDb()
    const userRepository = new RepositoryUserMongo()
    const getAllMessagesByUserId = new GetAllMessagesByUserId(userRepository)
    const message = await getAllMessagesByUserId.exec(userId)
    console.log('message', message)

    await pusherServer.trigger(toPusherKey(`chat:${userId}`), 'incoming-message', message)

    await pusherServer.trigger(toPusherKey(`user:${userId}:chats`), 'new_message', {
        ...message,
        senderId: userId,
    })

    console.log('trigger')

    if (message === null) {
        return NextResponse.json({
            message: 'Error fetching messages',
            error: true,
            status: HttpStatusCode.BAD_REQUEST,
        })
    }

    return NextResponse.json({
        message: 'Messages fetched successfully',
        error: false,
        status: HttpStatusCode.OK,
        data: message,
    })
}
