'use client'

import ChatInput from '@/components/ChatInput'
import Messages from '@/components/Messages'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Message from '@/core/message/entity/Message'
import User from '@/core/user/entity/User'
import { capitalizeFirstLetter, getUserLocalStorage } from '@/utils'
import { useEffect, useState } from 'react'

type ClientProps = {
    params: {
        chatId: string
    }

    searchParams: { id: string }
}

export default function Chat({ params: { chatId }, searchParams }: ClientProps) {
    const [receiverUser, setReceiverUser] = useState<User | null>(null)
    const [initialMessages, setInitialMessages] = useState<Message[]>([])
    async function getChatMessages(sentUserId: string) {
        try {
            const req = await fetch(`/api/clients/chat/${sentUserId}`)
            const res = await req.json()

            if (!res) return []

            return res
        } catch (error) {
            console.log(error)
        }
    }

    const getReceiverUser = async (receiverId: string) => {
        try {
            const req = await fetch(`/api/clients/client/${receiverId}`)
            const res = await req.json()

            if (!res) return null

            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getChatMessages(searchParams.id).then((res) => setInitialMessages(res))
        getReceiverUser(searchParams.id).then((res) => setReceiverUser(res))
    }, [searchParams.id])

    if (!receiverUser) return <div>Loading...</div>
    const sentUser = getUserLocalStorage()

    if (!sentUser) return <div>Loading...</div>
    // let initialMessages: Message[]  = []
    // const initialMessages = await getChatMessages(sentUserId)

    return (
        <div className="flex w-full h-[90vh] justify-center items-center">
            <Card className="w-[440px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
                <CardHeader>
                    <CardTitle>Chat with {capitalizeFirstLetter(receiverUser.username)}</CardTitle>
                    <CardDescription>{receiverUser.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 overflow-y-hidden">
                    <Messages
                        chatId={chatId}
                        sentUserId={sentUser?._id ?? ''}
                        receiverUserId={searchParams.id}
                        initialMessages={initialMessages}
                    />
                </CardContent>
                <CardFooter>
                    <ChatInput
                        chatId={chatId}
                        senderId={sentUser._id ?? ''}
                        chatPartner={receiverUser}
                        receiverId={searchParams.id}
                    />
                </CardFooter>
            </Card>
        </div>
    )
}
