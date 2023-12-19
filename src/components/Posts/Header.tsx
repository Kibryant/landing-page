'use client'

import {
    ChatBubbleBottomCenterIcon,
    StarIcon,
    HomeIcon as HomeIconOutline,
    HeartIcon,
    NewspaperIcon,
} from '@heroicons/react/24/outline'
import { HomeIcon, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { Compass, CompassIcon } from 'lucide-react'
import Link from 'next/link'
import Logo from '../Logo'
import { MyLink } from '../MyLink'
import { Search } from './Search'
import { Plus } from './Plus'
import { Story } from './Story'

const Header = () => {
    return (
        <header className="flex justify-between w-screen absolute z-50">
            <aside className={`h-screen w-80 py-8 px-5 duration-300 border-r fixed`}>
                <div className="flex justify-start">
                    <Logo />
                </div>
                <nav>
                    <ul className="pt-6 space-y-8">
                        <li>
                            <MyLink href="/posts" OutlineIcon={HomeIconOutline} SolidIcon={HomeIcon}>
                                Home
                            </MyLink>
                        </li>
                        <li>
                            <Search />
                        </li>
                        <li>
                            <MyLink href="/posts/explorer" OutlineIcon={Compass} SolidIcon={CompassIcon}>
                                Explorer
                            </MyLink>
                        </li>
                        <li>
                            <MyLink href="/posts/favorites" OutlineIcon={StarIcon} SolidIcon={StarIcon}>
                                Favorites
                            </MyLink>
                        </li>
                        <li>
                            <Link href="/clients/chat" className="flex items-end gap-x-2">
                                <ChatBubbleBottomCenterIcon className="h-8 w-8 text-secondary-foreground" />
                                <span className={` text-secondary-foreground origin-left duration-300`}>Chat</span>
                            </Link>
                        </li>
                        <li>
                            <MyLink href="/posts/notification" OutlineIcon={HeartIcon} SolidIcon={HeartIconSolid}>
                                Notification
                            </MyLink>
                        </li>
                        <li>
                            <MyLink href="/clients/posts/create" OutlineIcon={NewspaperIcon} SolidIcon={NewspaperIcon}>
                                Create
                            </MyLink>
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center px-5 py-8 gap-y-3 items-start">
                    <MyLink href="/clients/profile" OutlineIcon={HeartIcon} SolidIcon={HeartIconSolid}>
                        Threads
                    </MyLink>
                    <Plus />
                    <div>
                        <p className="text-muted-foreground">© 2023</p>
                    </div>
                </div>
            </aside>
            <div className="w-full flex items-center justify-center py-8 gap-x-5">
                <Story img="https://github.com/shadcn.png" username="John" />
                <Story img="https://github.com/shadcn.png" username="John Doe" />
                <Story img="https://github.com/shadcn.png" username="John Doe" />
                <Story img="https://github.com/shadcn.png" username="John Doe" />
                <Story img="https://github.com/shadcn.png" username="John Doe" />
                <Story img="https://github.com/shadcn.png" username="Doe" />
                <Story img="https://github.com/shadcn.png" username="Doe" />
                <Story img="https://github.com/shadcn.png" username="Doe" />
            </div>
        </header>
    )
}

export { Header }
