import { ArrowLongRightIcon, BugAntIcon, StarIcon } from '@heroicons/react/24/outline'
import Logo from '../Logo'
import dynamic from 'next/dynamic'
import { MiniBox } from '../MiniBox'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
    isAdm?: boolean
    showContent?: boolean
}

const Header = ({ isAdm, showContent }: HeaderProps) => {
    const Navbar = !isAdm ? dynamic(() => import('./Navbar')) : dynamic(() => import('./NavbarAdm'))

    return (
        <header className="flex flex-col items-center gap-6 px-2 py-4">
            <div className="flex sticky items-start w-full">
                <Logo />
                <Navbar />
            </div>

            {!isAdm ||
                (showContent && (
                    <>
                        <div className="w-full items-center max-w-7xl flex flex-col gap-10">
                            <div className="flex flex-col justify-center items-center gap-2 px-2">
                                <MiniBox text="JohnDoe" Icon={StarIcon} />
                                <h1 className="text-5xl font-bold">
                                    This is my first <span className="text-brandBlue">Portfolio</span>
                                </h1>
                                <p className="text-zinc-700 text-left max-w-xl">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit,
                                    aliquam repudiandae saepe
                                </p>
                                <div className="flex flex-col gap-2 w-full max-w-xl">
                                    <Link
                                        href="/accounts/sign-up"
                                        className="w-full py-2 px-3 bg-brandBlue font-bold uppercase text-white rounded-md"
                                    >
                                        Get started
                                    </Link>
                                    <Link
                                        href="/accounts/sign-in"
                                        className="text-brandBlue bg-white rounded-md shadow-lg py-2 px-3 flex gap-1 font-bold"
                                    >
                                        <span>Explore</span>
                                        <ArrowLongRightIcon className="w-6 h-6" />
                                    </Link>
                                </div>
                            </div>
                            <div className="-m-2 rounded-lg bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounde-xl lg:p-4">
                                <Image
                                    alt="background header"
                                    quality={100}
                                    width={1280}
                                    height={866}
                                    src="/images/dashboard-preview.jpg"
                                    className="bg-white rounded-lg p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                                />
                            </div>
                        </div>
                    </>
                ))}
        </header>
    )
}

export default Header
