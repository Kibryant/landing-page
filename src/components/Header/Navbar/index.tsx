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
                    className={`w-full h-[2px] bg-primary rounded duration-300  ${showNavbar && 'absolute -rotate-45 top-2/4 translate-y-[-50%]'
                        }`}
                ></div>
                <div
                    className={`w-full h-[2px] bg-primary rounded duration-300  ${showNavbar && 'rotate-0 opacity-0'}`}
                ></div>
                <div
                    className={`w-full h-[2px] bg-primary rounded duration-300  ${showNavbar && 'absolute rotate-45 bottom-2/4 translate-y-[50%]'
                        }`}
                ></div>
            </div >
            <ul
                className={`min-h-screen bg-muted duration-300 absolute w-screen flex-col top-0 flex justify-center items-center gap-4 sm:flex-row sm:relative sm:w-full sm:bg-transparent sm:transform-none sm:min-h-full sm:justify-start sm:px-8 ${showNavbar ? "translate-x-0" : "translate-x-full"}`}
            >
                <li>
                    <Link href="/" className={`hover:text-primary text-lg ${userPath === "/" && "text-primary"}`}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard" className="hover:text-primary text-lg">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/products" className="hover:text-primary text-lg">
                        Products
                    </Link>
                </li>
                <li>
                    <Link href="/chat" className="text=gray=900 hover:text-primary text-lg rounded-md">
                        ChatAi
                    </Link>
                </li>
                <li className='md:hidden py-2 px-4 hover:bg-primary/90 transition bg-primary rounded-md'>
                    <Link
                        href="/accounts/sign-up"
                        className="font-bold"
                    >
                        Sign Up
                    </Link>

                </li>
                <li className='md:hidden py-2 px-4 bg-primary-foreground shadow-lg rounded-md'>
                    <Link
                        href="/accounts/sign-in"
                        className="font-bold"
                    >
                        Sign In
                    </Link>
                </li>
            </ul>

            <div className='hidden sm:block sm:absolute sm:right-60'>
                <ModeToggle />
            </div>

            <Link
                href="/accounts/sign-in"
                className="py-2 px-4 hidden md:block font-bold absolute right-28 shadow-lg rounded-md"
            >
                Sign In
            </Link>
            <Link
                href="/accounts/sign-up"
                className="py-2 text-white px-4 hidden md:block font-bold absolute right-0 hover:bg-primary/90 transition bg-primary rounded-md"
            >
                Sign Up
            </Link>
        </nav >
    )
}

export default Navbar
