'use client'

import { Plus } from '@/components/Posts/Plus'
import { Search } from '@/components/Posts/Search'
import { ChatBubbleBottomCenterIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'
import { HomeIcon, CompassIcon, StarIcon, Link, HeartIcon, NewspaperIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Profile } from '@/components/Posts/Profile'

export function SeparatorDemo() {
    return (
        <div className="w-full">
            <Separator className="" />
            <div className="flex items-center justify-center w-full space-x-4 text-sm">
                <span className="text-sm text-center py-3 border-b w-full">Blog</span>
                <Separator orientation="vertical" />
                <span className="text-sm text-center py-3  w-full">Docs</span>
                <Separator orientation="vertical" />
                <span className="text-sm text-center py-3 w-full">Source</span>
            </div>
        </div>
    )
}

const Page: React.FC = () => {
    return (
        <div className="flex">
            <aside className={`h-screen w-20 py-8 px-5 duration-300 fixed`}>
                <div className="flex justify-center">
                    <PuzzlePieceIcon className={`text-primary w-12 h-12`} />
                </div>
                <nav className="w-full flex justify-center mt-10">
                    <ul className="pt-6 space-y-8">
                        <li>
                            <HomeIcon className={` w-8 h-8`} />
                        </li>
                        <li>
                            <Search />
                        </li>
                        <li>
                            <CompassIcon className={` w-8 h-8`} />
                        </li>
                        <li>
                            <ChatBubbleBottomCenterIcon className={` w-8 h-8`} />
                        </li>
                        <li>
                            <StarIcon className={` w-8 h-8`} />
                        </li>
                        <li>
                            <NewspaperIcon className={` w-8 h-8`} />
                        </li>
                        <li>
                            <Link className={` w-8 h-8`} />
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center px-5 py-8 gap-y-3 items-center">
                    <HeartIcon className={`text-primary w-8 h-8`} />
                    <Plus />
                    <div>
                        <p className="text-muted-foreground">&copy;2023</p>
                    </div>
                </div>
            </aside>
            <div className="flex flex-col w-96 ms-20 border-r items-start h-screen">
                <div className="flex w-full justify-between items-center border-b px-4 pt-10 pb-2">
                    <h1 className="text-xl font-bold">Arthur Gustavo</h1>
                    <span className="text-muted-foreground">with friends</span>
                </div>
                <SeparatorDemo />
                <div className="w-full mt-4 overflow-auto">
                    <ScrollArea className="w-full">
                        <div className="p-4 flex flex-col gap-y-3">
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                            <Profile />
                        </div>
                    </ScrollArea>
                </div>
            </div>
            <div className="flex-1">
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-4xl font-bold">Welcome to the chat</h1>
                    <p className="text-muted-foreground">Select a chat to start messaging</p>
                </div>
            </div>
        </div>
    )
}

export default Page
