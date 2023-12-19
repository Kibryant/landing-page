'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface MyLinkProps {
    href: string
    children: React.ReactNode
    OutlineIcon: React.ElementType
    SolidIcon: React.ElementType
}

const MyLink: React.FC<MyLinkProps> = ({ OutlineIcon, children, href, SolidIcon }) => {
    const pathname = usePathname()

    return (
        <Link href={href} className="flex items-end gap-x-2">
            {pathname === href ? (
                <SolidIcon className="h-8 w-8 text-secondary-foreground" />
            ) : (
                <OutlineIcon className="h-8 w-8 text-secondary-foreground" />
            )}
            <span
                // eslint-disable-next-line prettier/prettier
                className={`text-secondary-foreground origin-left duration-300 ${pathname === href && 'text-secondary-foreground font-bold'
                    // eslint-disable-next-line prettier/prettier
                    }`}
            >
                {children}
            </span>
        </Link>
    )
}

export { MyLink }
