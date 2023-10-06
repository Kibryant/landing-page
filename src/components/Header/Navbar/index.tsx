/* eslint-disable prettier/prettier */
'use client'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

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
                        <Link href="/" className="text-gray-900 hover:text-brandBlue">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className="text-gray-900 hover:text-brandBlue">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" className="text=gray=900 hover:text-brandBlue rounded-md">
                            Register
                        </Link>
                    </li>
                </ul>
            </div>
            <Link
                href="/accounts/sign-in"
                className="py-2 px-4 hidden md:block font-bold absolute right-28 hover:bg-zinc-200 text-gray-900 shadow-lg rounded-md"
            >
                Sign In
            </Link>
            <Link
                href="/accounts/sign-up"
                className="py-2 px-4 hidden md:block font-bold absolute right-0 text-white hover:bg-blue-700 transition bg-brandBlue rounded-md"
            >
                Sign Up
            </Link>
        </nav>
    )
}

export default Navbar
