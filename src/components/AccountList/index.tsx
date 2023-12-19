import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import { CalendarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Account {
    id: string
    name: string
    createdAt: Date
}

interface AccountListProps {
    accounts: Account[]
}

const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full">
            <h3 className="text-xl font-semibold">Your Accounts</h3>
            <div className="flex flex-col gap-3 justify-center items-center">
                {accounts.map((account) => (
                    <HoverCard key={account.id}>
                        <HoverCardTrigger asChild>
                            <Button variant="link" className="text-lg" asChild>
                                <Link href={`/accounts/${account.id}`}>{account.name}</Link>
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>VC</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">@{account.name}</h4>
                                    <p className="text-sm">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, voluptate!
                                    </p>
                                    <div className="flex items-center pt-2">
                                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
                                        <span className="text-xs text-muted-foreground">
                                            {format(account.createdAt, 'hh:mm a')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                ))}
            </div>
        </div>
    )
}

export { AccountList }
