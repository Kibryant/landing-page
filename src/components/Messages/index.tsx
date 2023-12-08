'use client'

import Message from '@/core/message/entity/Message'
import { pusherClient } from '@/lib/pusher'
import { cn, toPusherKey } from '@/utils'
import { format } from 'date-fns'
import { FC, useEffect, useRef, useState } from 'react'

interface MessagesProps {
    initialMessages: Message[]
    receiverUserId: string
    sentUserId: string
    chatId: string
}

const Messages: FC<MessagesProps> = ({ chatId, initialMessages, sentUserId }) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages)

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`chat:${chatId}`))

        const messageHandler = (message: Message) => {
            console.log('message', message)
            setMessages((prev) => [message, ...prev])
        }

        pusherClient.bind('incoming-message', messageHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`))
            pusherClient.unbind('incoming-message', messageHandler)
        }
    }, [chatId])

    const scrollDownRef = useRef<HTMLDivElement | null>(null)

    return (
        <div
            id="messages"
            className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
            <div ref={scrollDownRef} />
            {messages.map((message, index) => {
                const isCurrentUser = message.senderId === sentUserId

                const hasNextMessageFromSameUser = messages[index - 1]?.senderId === messages[index].senderId
                return (
                    <div className="chat-message" key={`${message.id}-${message.createdAt}`}>
                        <div
                            className={cn('flex items-end', {
                                'justify-end': isCurrentUser,
                            })}
                        >
                            <div
                                className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2', {
                                    'order-1 items-end': isCurrentUser,
                                    'order-2 items-start': !isCurrentUser,
                                })}
                            >
                                <span
                                    className={cn('px-4 py-2 rounded-lg inline-block', {
                                        'bg-primary text-secondary-foreground': isCurrentUser,
                                        'bg-secondary': !isCurrentUser,
                                        'rounded-br-none': !hasNextMessageFromSameUser && isCurrentUser,
                                        'rounded-bl-none': !hasNextMessageFromSameUser && !isCurrentUser,
                                    })}
                                >
                                    {message.content}{' '}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {format(new Date(message.createdAt), 'hh:mm a')}
                                </span>
                            </div>

                            <div
                                className={cn('relative w-6 h-6', {
                                    'order-2': isCurrentUser,
                                    'order-1': !isCurrentUser,
                                    invisible: hasNextMessageFromSameUser,
                                })}
                            ></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Messages
