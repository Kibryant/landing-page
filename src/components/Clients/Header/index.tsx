/* eslint-disable prettier/prettier */
'use client'

import {
    ChatBubbleBottomCenterIcon,
    ChevronLeftIcon,
    ClipboardDocumentCheckIcon,
    Cog6ToothIcon,
    CommandLineIcon,
    HomeIcon,
    ShoppingCartIcon,
    StarIcon,
} from '@heroicons/react/24/outline'
import { ArrowRightFromLineIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const Header = (props: { username: string }) => {
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <header>
            <aside className={`h-screen ${openMenu ? 'w-72' : 'w-20'} p-5 duration-300 border-r relative`}>
                <div className="flex items-center gap-x-2">
                    <span>
                        <CommandLineIcon className="text-secondary-foreground w-8 h-8" />
                    </span>
                    <h1
                        // eslint-disable-next-line prettier/prettier
                        className={`text-secondary-foreground font-semibold origin-left text-xl duration-300 ${!openMenu && 'scale-0'
                            // eslint-disable-next-line prettier/prettier
                            }`}
                    >
                        Web Developer
                    </h1>
                </div>
                <button
                    className="bg-primary border-2 border-secondary rounded-full p-[6px] cursor-pointer absolute -right-4 bottom-9"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <ChevronLeftIcon className={`h-5 w-5 text-secondary duration-300 ${!openMenu && 'rotate-180'}`} />
                </button>
                <nav>
                    <ul className="pt-6 space-y-2">
                        <li>
                            <Link href="/" className="my-custom-class">
                                <HomeIcon className="h-5 w-5 text-secondary-foreground" />

                                <span
                                    className={`${!openMenu && 'hidden'
                                        } text-secondary-foreground origin-left duration-300`}
                                >
                                    Menu
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/clients/tasks" className="my-custom-class">
                                <ClipboardDocumentCheckIcon className="h-5 w-5 text-secondary-foreground" />
                                <span
                                    className={`${!openMenu && 'hidden'
                                        } text-secondary-foreground origin-left duration-300`}
                                >
                                    Your Tasks
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/clients/${props.username}`} className="my-custom-class">
                                <StarIcon className="h-5 w-5 text-secondary-foreground" />
                                <span
                                    className={`${!openMenu && 'hidden'
                                        } text-secondary-foreground origin-left duration-300`}
                                >
                                    You Area
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="my-custom-class">
                                <ShoppingCartIcon className="h-5 w-5 text-secondary-foreground" />

                                <span
                                    className={`${!openMenu && 'hidden'
                                        } text-secondary-foreground origin-left duration-300`}
                                >
                                    Products
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="my-custom-class">
                                <StarIcon className="h-5 w-5 text-secondary-foreground" />
                                <span
                                    className={`${!openMenu && 'hidden'
                                        } text-secondary-foreground origin-left duration-300`}
                                >
                                    Log Out
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/clients/chat" className="my-custom-class">
                                <ChatBubbleBottomCenterIcon className="h-5 w-5 text-secondary-foreground" />
                                <span
                                    className={`${!openMenu && 'hidden'
                                        } text-secondary-foreground origin-left duration-300`}
                                >
                                    Chat
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/clients/chat" className="my-custom-class">
                                <Cog6ToothIcon className="h-5 w-5 text-secondary-foreground" />
                                <span
                                    className={`${!openMenu && 'hidden'
                                        } text-secondary-foreground origin-left duration-300`}
                                >
                                    Configs
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/clients/chat" className="my-custom-class">
                                <ArrowRightFromLineIcon className="h-5 w-5 text-secondary-foreground" />
                                <span
                                    className={`${!openMenu && 'hidden'
                                        } text-secondary-foreground origin-left duration-300`}
                                >
                                    Log-Out
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {openMenu && (
                    <div className="absolute bottom-0 left-0 w-full flex justify-center items-center">
                        <p className="text-secondary-foreground text-sm">© 2021, All Rights Reserved.</p>
                    </div>
                )}
            </aside>
        </header>
    )
}

export { Header }
