import { StarIcon } from '@heroicons/react/24/outline'
import Logo from '../Logo'
import { MiniBox } from '../MiniBox'
import Image from 'next/image'
import Navbar from './Navbar'

interface HeaderProps {
    isAdm?: boolean
    showContent?: boolean
}

const Header = ({ isAdm, showContent }: HeaderProps) => {
    return (
        <header className="flex flex-col items-center justify-center w-full  gap-y-4 sm:gap-6 sm:py-4">
            <div className="flex w-full justify-between">
                <Logo />
                <Navbar />
            </div>

            {isAdm ||
                (showContent && (
                    <>
                        <Image
                            alt="Cloud"
                            quality={100}
                            width={300}
                            height={300}
                            src="/images/cloud.png"
                            className="-right-32 rotate-180 top-[700px] absolute z-[-999] dark:hidden"
                        />
                        <div className="w-full items-center max-w-7xl flex flex-col gap-10">
                            <div className="flex flex-col sm:justify-center items-start sm:items-center gap-2 px-2">
                                <MiniBox text="Arthur's" Icon={StarIcon} />
                                <h1 className="text-5xl font-bold text-left sm:text-center">
                                    This is my first <span className="text-primary">Portfolio</span>
                                </h1>
                                <p className="text-left sm:text-center max-w-xl">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit,
                                    aliquam repudiandae saepe
                                </p>
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
