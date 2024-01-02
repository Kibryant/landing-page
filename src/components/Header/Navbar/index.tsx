'use client'

import { ModeToggle } from '@/components/DropdownTheme'
import { Button } from '@/components/ui/button'
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
        <div className="relative flex items-center ms-10 justify-end md:justify-between w-full">
            <div className="items-center justify-between hidden gap-8 md:flex">
                <Link href="/">Product</Link>
                <Link href="/">Features</Link>
                <Link href="/">Pricing</Link>
                <Link href="/">Company</Link>
            </div>
            <div className="items-center hidden gap-3 md:flex">
                <ModeToggle />
                <Button className="text-secondary-foreground">Log In</Button>
                <Button variant="outline">Sign Up</Button>
            </div>
            <button
                className="w-6 h-4 z-10 cursor-pointer relative flex flex-col justify-between md:hidden items-center"
                onClick={toggleNavbar}
            >
                <div
                    // eslint-disable-next-line prettier/prettier
                    className={`w-full h-[2px] bg-primary rounded duration-300  ${showNavbar && 'absolute -rotate-45 top-2/4 translate-y-[-50%]'
                        // eslint-disable-next-line prettier/prettier
                        }`}
                ></div>
                <div
                    className={`w-full h-[2px] bg-primary rounded duration-300  ${showNavbar && 'rotate-0 opacity-0'}`}
                ></div>
                <div
                    // eslint-disable-next-line prettier/prettier
                    className={`w-full h-[2px] bg-primary rounded duration-300  ${showNavbar && 'absolute rotate-45 bottom-2/4 translate-y-[50%]'
                        // eslint-disable-next-line prettier/prettier
                        }`}
                ></div>
            </button>

            <nav
                // eslint-disable-next-line prettier/prettier
                className={`${showNavbar ? 'absolute flex' : 'hidden'
                    // eslint-disable-next-line prettier/prettier
                    } bg-card md:hidden duration-500 flex-col items-start shadow-main justify-center w-full gap-3 overflow-hidden max-h-0 ${showNavbar && 'py-4'
                    // eslint-disable-next-line prettier/prettier
                    }  px-4 rounded-lg ${showNavbar && 'max-h-96'} top-full`}
            >
                <ul className="flex flex-col gap-y-3">
                    <li>
                        <Link href="/" className={`hover:text-primary text-lg ${userPath === '/' && 'text-primary'}`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard"
                            className={`hover:text-primary text-lg ${userPath === '/dashboard' && 'text-primary'}`}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products"
                            className={`hover:text-primary text-lg ${userPath === '/products' && 'text-primary'}`}
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/chat/ia"
                            className={`hover:text-primary text-lg ${userPath === '/chat/ia' && 'text-primary'}`}
                        >
                            ChatAi
                        </Link>
                    </li>
                </ul>
                <ModeToggle />
                <Button className="w-full text-secondary-foreground">Log In</Button>
                <Button variant="outline" className="w-full text-secondary-foreground">
                    Sign Up
                </Button>
            </nav>

            {/* <div className="grid w-full grid-cols-1 my-auto mt-12 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5">
                <div className="flex flex-col justify-center col-span-1 text-center lg:text-start">
                    <div className="flex items-center justify-center mb-4 lg:justify-normal">
                        <h4 className="ml-2 text-sm font-bold tracking-widest text-primary uppercase">
                            Explore the Latest Tailwind Template
                        </h4>
                    </div>
                    <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-dark-grey-900">
                        Elevate your website with Motion
                    </h1>
                    <p className="mb-6 text-base leading-7 lg:w-3/4 text-grey-900">
                        Say goodbye to endless hours spent on building templates from scratch. Experience the quickest,
                        most responsive, and trendiest dashboard solution available. Seriously.
                    </p>
                    <div className="flex flex-col items-center gap-4 lg:flex-row">
                        <button className="flex items-center py-4 text-sm font-bold text-white px-7 bg-purple-blue-500 hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 transition duration-300 rounded-xl">
                            Get started now
                        </button>
                        <button className="flex items-center py-4 text-sm font-medium px-7 transition duration-300 rounded-2xl">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 mr-2"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Book a free call
                        </button>
                    </div>
                </div>
                <div className="items-center justify-end hidden col-span-1 md:flex"></div>
            </div> */}
        </div>
    )
}

export default Navbar
