'use client'

import {
    ChevronLeftIcon,
    CloudIcon,
    CommandLineIcon,
    HomeModernIcon,
    ShoppingCartIcon,
    StarIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'

const Header = (props: { username: string }) => {
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <header>
            <aside className={`h-screen ${openMenu ? 'w-72' : 'w-20'} p-5 duration-300 bg-primary relative`}>
                <div className="flex items-center gap-x-2">
                    <span>
                        <CommandLineIcon className="text-white w-8 h-8" />
                    </span>
                    <h1
                        // eslint-disable-next-line prettier/prettier
                        className={`text-white font-semibold origin-left text-xl duration-300 ${!openMenu && 'scale-0'
                            // eslint-disable-next-line prettier/prettier
                            }`}
                    >
                        Web Developer
                    </h1>
                </div>
                <button
                    className="bg-white border-2 rounded-full p-[6px] cursor-pointer absolute -right-4 bottom-9"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <ChevronLeftIcon className={`h-5 w-5 duration-300 ${!openMenu && 'rotate-180'}`} />
                </button>
                <nav>
                    <ul className="pt-6 space-y-2">
                        <li>
                            <Link href="/" className="my-custom-class">
                                <HomeModernIcon className="h-5 w-5 text-white" />

                                <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>Menu</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/clients/tasks" className="my-custom-class">
                                <CloudIcon className="h-5 w-5 text-white" />
                                <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>Your Tasks</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/clients/${props.username}`} className="my-custom-class">
                                <StarIcon className="h-5 w-5 text-white" />
                                <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>You Area</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="my-custom-class">
                                <ShoppingCartIcon className="h-5 w-5 text-white" />

                                <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="my-custom-class">
                                <StarIcon className="h-5 w-5 text-white" />
                                <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </header>
    )
}

export { Header }
