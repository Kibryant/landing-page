import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ActivityIcon, MenuIcon, SaveIcon } from 'lucide-react'
import { Cog8ToothIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ModeToggle } from '../DropdownTheme'

interface Props {
    showText?: boolean
}

const Plus: React.FC = ({ showText }: Props) => {
    return (
        <Popover>
            <PopoverTrigger className="flex gap-x-2 items-end">
                <MenuIcon className="h-8 w-8 text-secondary-foreground" />
                {showText && <span className={`text-secondary-foreground origin-left duration-300`}>More</span>}
            </PopoverTrigger>
            <PopoverContent className="py-6 ms-4">
                <ul className="space-y-6 px-4">
                    <li>
                        <ModeToggle />
                    </li>
                    <li>
                        <Link href="/clients/config" className="flex items-end gap-x-2">
                            <Cog8ToothIcon className="h-6 w-6 text-secondary-foreground" />
                            <span className={`text-secondary-foreground origin-left duration-300`}>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/clients/config" className="flex items-end gap-x-2">
                            <ActivityIcon className="h-6 w-6 text-secondary-foreground" />
                            <span className={`text-secondary-foreground origin-left duration-300`}>Your Activies</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/clients/config" className="flex items-end gap-x-2">
                            <SaveIcon className="h-6 w-6 text-secondary-foreground" />
                            <span className={`text-secondary-foreground origin-left duration-300`}>Saves</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/clients/config" className="flex items-end gap-x-2">
                            <ShieldExclamationIcon className="h-6 w-6 text-secondary-foreground" />
                            <span className={`text-secondary-foreground origin-left duration-300`}>
                                Report a problem
                            </span>
                        </Link>
                    </li>
                    <li className="mt-4 border-t pt-3">
                        <Link href="/accounts/sign-up" className="flex items-end gap-x-2">
                            <span>Change Acconut</span>
                        </Link>
                    </li>
                    <li className="border-t pt-3">
                        <Link href="/acconts/log-out" className="flex items-end gap-x-2">
                            <span>Exit</span>
                        </Link>
                    </li>
                </ul>
            </PopoverContent>
        </Popover>
    )
}

export { Plus }
