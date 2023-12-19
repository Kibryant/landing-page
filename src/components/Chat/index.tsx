'use client'

import Header from '@/components/Header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useChat } from 'ai/react'

const Chat = () => {
    const { input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
    })

    return (
        <>
            <Header showContent={false} />
            <div className="w-full flex justify-center items-center">
                <Card className="w-[440px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
                    <CardHeader>
                        <CardTitle>Chat Ai</CardTitle>
                        <CardDescription>Open Ai intergrated with Vercel SDK</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2 items-start">
                            {/* <Avatar>
                                <AvatarFallback>AG</AvatarFallback>
                                <AvatarImage src="https://lh3.googleusercontent.com/Oq1xxMCJDMLkte6LyCHzesOetvI58TWzScblAt4c6uYF-Q7gjnJdCB5n2P-Or0vc8xVu5g8s7rPxYpVTf7LIcyWGfQ=s137" />
                            </Avatar> */}
                            <Avatar>
                                <AvatarFallback>IA</AvatarFallback>
                                <AvatarImage src="https://lh3.googleusercontent.com/Oq1xxMCJDMLkte6LyCHzesOetvI58TWzScblAt4c6uYF-Q7gjnJdCB5n2P-Or0vc8xVu5g8s7rPxYpVTf7LIcyWGfQ=s137" />
                            </Avatar>
                            <p className="text-xs leading-relaxed">
                                <span className="block font-bold">Ai</span>
                                Hello, World!
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
                            <Input placeholder="How i can help you?" value={input} onChange={handleInputChange} />
                            <Button type="submit">Send</Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export { Chat }
