'use client'

import axios from 'axios'
import { FC, useRef, useState } from 'react'
import User from '@/core/user/entity/User'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { capitalizeFirstLetter } from '@/utils'

interface ChatInputProps {
    chatPartner: User
    senderId: string
    receiverId: string
    chatId: string
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId, senderId, receiverId }) => {
    const textareaRef = useRef<HTMLInputElement | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')

    const sendMessage = async () => {
        if (!input) return
        setIsLoading(true)

        try {
            await axios.post(`/api/clients/chat/${senderId}`, { message: input, senderId, receiverId, chatId })
            setInput('')
            textareaRef.current?.focus()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error('Error in send message')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Input
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message to ${capitalizeFirstLetter(chatPartner.username)}`}
            />

            <div onClick={() => textareaRef.current?.focus()} className="py-2" aria-hidden="true">
                <div className="py-px">
                    <div className="h-9" />
                </div>
            </div>

            <Button disabled={isLoading} onClick={sendMessage} type="submit">
                Sent
            </Button>
        </>
    )
}

export default ChatInput
