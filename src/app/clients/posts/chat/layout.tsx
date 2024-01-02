import { Plus } from '@/components/Posts/Plus'
import { Search } from '@/components/Posts/Search'
import { ChatBubbleBottomCenterIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'
import { HomeIcon, CompassIcon, StarIcon, Link, HeartIcon, NewspaperIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/Posts/Separator'
import { ListOfPeople } from '@/components/Posts/Chat/ListOfPeople'
import { headers } from 'next/headers'
import User from '@/core/user/entity/User'
import { getUserCookies } from '@/utils/getUserCookies'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
    const getUsers = async () => {
        const host = headers().get('host')
        const protocal = process.env.NODE_ENV === 'development' ? 'http' : 'https'
        const req = await fetch(`${protocal}://${host}/api/clients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 1000,
            },
        })

        const res = await req.json()
        const users = res.data as User[]
        return users
    }

    const sentUser = getUserCookies()

    const users = (await getUsers()) as User[]
    return (
        <div className="flex">
            <aside className={`h-screen w-20 py-8 px-5 duration-300 fixed`}>
                <div className="flex justify-center">
                    <PuzzlePieceIcon className={`text-primary w-12 h-12`} />
                </div>
                <nav className="w-full flex justify-center mt-10">
                    <ul className="pt-6 space-y-8">
                        <li>
                            <HomeIcon className={`w-8 h-8`} />
                        </li>
                        <li>
                            <Search />
                        </li>
                        <li>
                            <CompassIcon className={`w-8 h-8`} />
                        </li>
                        <li>
                            <ChatBubbleBottomCenterIcon className={` w-8 h-8`} />
                        </li>
                        <li>
                            <StarIcon className={` w-8 h-8`} />
                        </li>
                        <li>
                            <NewspaperIcon className={` w-8 h-8`} />
                        </li>
                        <li>
                            <Link className={` w-8 h-8`} />
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center px-5 py-8 gap-y-3 items-center">
                    <HeartIcon className={`text-primary w-8 h-8`} />
                    <Plus />
                    <div>
                        <p className="text-muted-foreground">&copy;2023</p>
                    </div>
                </div>
            </aside>
            <div className="flex flex-col w-96 ms-20 border-r items-start h-screen">
                <div className="flex w-full justify-between items-center border-b px-4 pt-10 pb-2">
                    <h1 className="text-xl font-bold">Arthur Gustavo</h1>
                    <span className="text-muted-foreground">with friends</span>
                </div>
                <Separator />
                <div className="w-full mt-4 overflow-auto">
                    <ScrollArea className="w-full">
                        <div className="p-4 flex flex-col gap-y-3">
                            <ListOfPeople users={users} sentUserId={sentUser?._id || ''} />
                        </div>
                    </ScrollArea>
                </div>
            </div>
            <div className="flex-1">
                <div className="flex flex-col items-center justify-center h-screen">{children}</div>
            </div>
        </div>
    )
}

export default Layout
