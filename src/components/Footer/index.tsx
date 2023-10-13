import { StarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { DogIcon, SunIcon, TvIcon } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="w-full flex items-center justify-center py-4 px-2 bg-secondary">
            <div className="flex flex-col gap-6 w-full max-w-7xl">
                <div className="grid place-items-center grid-cols-4 w-full">
                    <div className="flex flex-col justify-center gap-2">
                        <h2 className="font-bold">Arthur&apos;s</h2>
                        <p className="text-justify text-muted-foreground text-xs">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis provident eum at
                            architecto natus? Eveniet corrupti voluptas laboriosam laudantium, blanditiis cumque fugit
                            deserunt tenetur culpa accusamus,
                        </p>
                        <div className="flex gap-2">
                            <div className="p-3 border border-secondary-foreground rounded-full">
                                <StarIcon className="w-6 h-6 " />
                            </div>
                            <div className="p-3 border border-secondary-foreground rounded-full">
                                <TvIcon className="w-6 h-6 " />
                            </div>
                            <div className="p-3 border border-secondary-foreground rounded-full">
                                <DogIcon className="w-6 h-6 " />
                            </div>
                            <div className="p-3 border border-secondary-foreground rounded-full">
                                <SunIcon className="w-6 h-6 " />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <h3 className=" font-semi-bold">Resources</h3>
                        <div className="flex flex-col gap-2 ">
                            <Link href="" className="text-sm">
                                Home
                            </Link>
                            <Link href="" className="text-sm">
                                Products
                            </Link>
                            <Link href="" className="text-sm">
                                SignIn
                            </Link>
                            <Link href="" className="text-sm">
                                Oie
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <h3 className=" font-semibold">Useful Links</h3>
                        <div className="flex flex-col gap-2 ">
                            <Link href="" className="text-sm">
                                Home
                            </Link>
                            <Link href="" className="text-sm">
                                Products
                            </Link>
                            <Link href="" className="text-sm">
                                SignIn
                            </Link>
                            <Link href="" className="text-sm">
                                Oie
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <h2 className="">News Letter</h2>
                        <p className="text-justify text-xs">Sign-Up with you email!</p>
                        <div className="flex flex-col gap-1">
                            <Input className="bg-transparent border border-secondary-foreground outline-none" />
                            <Button>Send</Button>
                        </div>
                    </div>
                </div>
                <div className="border-t py-2">
                    <p className="text-center text-xs font-medium">Copyright 2021 Arthur&apos;s All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
