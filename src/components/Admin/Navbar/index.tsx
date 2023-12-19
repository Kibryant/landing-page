/* eslint-disable prettier/prettier */
'use client'
import Link from 'next/link'
import { useState } from 'react'

const NavbarAdm = () => {
    const [showNavbar, setShowNavbar] = useState(false)

    function toggleNavbar() {
        setShowNavbar(!showNavbar)
    }

    return (
        <div className="flex w-full justify-end md:justify-start">
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
            </div>
            <nav className="flex justify-start md:justify-end items-center">
                <ul
                    className={`absolute gap-6 flex flex-col items-center justify-center duration-300 top-0 min-h-screen w-full 
            md:static bg-zinc-100 md:bg-transparent text-xl
            md:min-h-full md:flex-row md:text-base md:h-full md:items-center md:w-2/5 ${showNavbar ? 'left-0' : 'left-full'
                        }`}
                >
                    <li>
                        <Link href="/admin/dashboard" className="hover:text-primary">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/adm/products" className="hover:text-primary">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href="/adm/configuration" className="hover:text-primary">
                            Configuration
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export { NavbarAdm }
