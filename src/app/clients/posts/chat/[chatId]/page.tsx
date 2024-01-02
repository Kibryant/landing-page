'use client'

import { Input } from '@/components/ui/input'
import { PhoneIcon, ShieldExclamationIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SmileIcon, FileAudio, CameraIcon, Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/external/database/connections/firebase/config'
import User from '@/core/user/entity/User'
import { capitalizeFirstLetter, cn, getUserLocalStorage } from '@/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'

type Props = {
    params: {
        chatId: string
    }
}

interface Message {
    content: string
    createdAt: {
        seconds: number
        nanoseconds: number
    }
    id: string
    user: User
    chatId: string
}

const Page = ({ params: { chatId } }: Props) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const user = getUserLocalStorage()
    const messagesRef = collection(db, 'messages')

    useEffect(() => {
        const queryMessages = query(messagesRef, where('chatId', '==', chatId))
        const unscribe = onSnapshot(queryMessages, (snapshot) => {
            const newMessages: Message[] = []
            snapshot.forEach((doc) => {
                const { message, user, createdAt, chatId } = doc.data()
                newMessages.push({ content: message, createdAt, id: doc.id, user, chatId })
            })
            setMessages(newMessages)
        })
        return () => unscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (message.trim() === '') return

        await addDoc(messagesRef, {
            message,
            createdAt: new Date(),
            user,
            chatId,
        })
        setMessage('')
    }

    const scrollDownRef = useRef<HTMLDivElement | null>(null)
    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex flex-row h-full">
                <div className="flex-1">
                    <div className="flex flex-col h-full">
                        <div className="flex flex-row items-center justify-between p-3 border-b border-gray-200">
                            <div className="flex flex-row items-center gap-x-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        className="rounded-full"
                                        src="https://github.com/ArthurGustavo.png"
                                        alt="Profile"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-xl font-bold">Chat</h1>
                                    <p className="text-muted-foreground">Last seen 10 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <button className="flex items-center justify-center w-10 h-10 rounded-full border">
                                    <PhoneIcon className="w-5 h-5" />
                                </button>
                                <button className="flex items-center justify-center w-10 h-10 rounded-full border">
                                    <VideoCameraIcon className="w-5 h-5" />
                                </button>
                                <button className="flex items-center justify-center w-10 h-10 rounded-full border">
                                    <ShieldExclamationIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-y-hidden">
                            <div
                                id="messages"
                                className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                            >
                                <div ref={scrollDownRef} />
                                {messages.map((message, index) => {
                                    const hasNextMessageFromSameUser =
                                        messages[index - 1]?.user._id === messages[index].user._id
                                    const isCurrentUser = message.user._id === user?._id

                                    const { seconds, nanoseconds } = message.createdAt
                                    const timestampInMilliseconds = seconds * 1000 + nanoseconds / 1000000
                                    const date = new Date(timestampInMilliseconds)

                                    const formattedDate = format(date, 'dd/MM/yyyy HH:mm:ss')
                                    return (
                                        <div className="chat-message" key={`${message.id}-${message.createdAt}`}>
                                            <div
                                                className={cn('flex items-end', {
                                                    'justify-end': isCurrentUser,
                                                    'justify-start': !isCurrentUser,
                                                })}
                                            >
                                                <div
                                                    className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2', {
                                                        'order-1 items-end': isCurrentUser,
                                                        'order-2 items-start': !isCurrentUser,
                                                    })}
                                                >
                                                    <Avatar>
                                                        <AvatarImage src={message.user.photoURL} />
                                                        <AvatarFallback>
                                                            {capitalizeFirstLetter(message.user.username[0])}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span
                                                        className={cn('px-4 py-2 rounded-lg inline-block', {
                                                            'bg-primary text-secondary-foreground': isCurrentUser,
                                                            'bg-indigo-600': !isCurrentUser,
                                                            'rounded-br-none':
                                                                !hasNextMessageFromSameUser && isCurrentUser,
                                                            'rounded-bl-none':
                                                                !hasNextMessageFromSameUser && !isCurrentUser,
                                                        })}
                                                    >
                                                        {message.content}{' '}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{formattedDate}</span>
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
                        </div>
                        <form className="px-5 py-3 relative flex items-center" onSubmit={handleSubmit}>
                            <div className="flex items-center space-x-3">
                                <FileAudio className="rounded-full bg-transparent" />
                                <CameraIcon className="rounded-full bg-transparent" />
                                <Heart className="rounded-full bg-transparent" />
                            </div>
                            <Input
                                onChange={handleChange}
                                className="rounded-3xl bg-transparent flex-grow mx-3"
                                placeholder="Message..."
                                value={message}
                            />
                            <div className="flex items-center space-x-3">
                                <SmileIcon className="rounded-full bg-transparent" />
                                <Button type="submit" className="rounded-3xl">
                                    Send
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
