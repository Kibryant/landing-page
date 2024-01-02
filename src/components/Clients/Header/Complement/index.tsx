'use client'

import { ModeToggle } from '@/components/DropdownTheme'
import { Button } from '@/components/ui/button'
import { capitalizeFirstLetter } from '@/utils'
import { ArrowRightFromLineIcon } from 'lucide-react'

interface Props {
    username: string
}

const Complement = ({ username }: Props) => {
    return (
        <div className="w-full flex items-center justify-between p-2 border-b">
            <p className="text-xl text-secondary-foreground font-bold">Hello, {capitalizeFirstLetter(username)} ☁️</p>
            <div className="flex gap-x-3">
                <Button className="text-primary-foreground font-bold ms-4">
                    <ArrowRightFromLineIcon size={20} />
                </Button>
                <ModeToggle />
            </div>
        </div>
    )
}

export { Complement }
