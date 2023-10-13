/* eslint-disable prettier/prettier */
'use client'
import { ModeToggle } from '@/components/DropdownTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)
    const userPath = usePathname()

    function toggleNavbar() {
        setShowNavbar(!showNavbar)
    }
    return (
        <nav className="flex relative w-full justify-end md:justify-start">
            <div
                className="w-6 h-4 z-10 cursor-pointer relative flex flex-col justify-between md:hidden items-center"
                onClick={toggleNavbar}
            >
                <div
                    className={`w-full h-[2px] bg-black rounded duration-300  ${showNavbar && 'absolute -rotate-45 top-2/4 translate-y-[-50%]'
                        }`}
                ></div>
                <div
                    className={`w-full h-[2px] bg-black rounded duration-300  ${showNavbar && 'rotate-0 opacity-0'}`}
                ></div>
                <div
                    className={`w-full h-[2px] bg-black rounded duration-300  ${showNavbar && 'absolute rotate-45 bottom-2/4 translate-y-[50%]'
                        }`}
                ></div>
            </div>
            <div className="flex justify-start md:justify-end items-center backdrop-blur-lg">
                <ul
                    className={`absolute gap-6 flex flex-col items-center justify-center duration-300 top-0 min-h-screen w-full 
            md:static bg-white md:bg-transparent text-xl
            md:min-h-full md:flex-row md:text-base md:h-full md:items-center md:w-2/5 ${showNavbar ? 'left-0' : 'left-full'
                        }`}
                >
                    <li>
                        <Link href="/" className={`hover:text-primary ${userPath === "/" && "text-primary"}`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className="hover:text-primary">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/products" className="hover:text-primary">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href="/chat" className="text=gray=900 hover:text-primary rounded-md">
                            ChatAi
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='absolute right-60'>
                <ModeToggle />
            </div>

            <Link
                href="/accounts/sign-in"
                className="py-2 px-4 hidden md:block font-bold absolute right-28 dark:hover:text-black hover:bg-zinc-200 shadow-lg rounded-md"
            >
                Sign In
            </Link>
            <Link
                href="/accounts/sign-up"
                className="py-2 px-4 hidden md:block font-bold absolute right-0 text-white hover:bg-primary/90 transition bg-primary rounded-md"
            >
                Sign Up
            </Link>
        </nav>
    )
}

export default Navbar
