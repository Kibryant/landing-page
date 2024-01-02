import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import User from '@/core/user/entity/User'

interface Props {
    showEdit?: boolean
    user?: User
}

const Profile: React.FC<Props> = ({ showEdit, user }) => {
    return (
        <div className="flex gap-x-2 w-full">
            <Avatar>
                <AvatarImage src={user?.photoURL} />
                <AvatarFallback>
                    <span className="text-lg">{user?.username[0]}</span>
                </AvatarFallback>
            </Avatar>
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col justify-start">
                    <span className="text-sm">{user?.username}</span>
                    <span className="text-xs text-muted-foreground">@{user?.email}</span>
                </div>

                {showEdit && (
                    <Link href="/profile" className="text-primary text-sm">
                        Edit
                    </Link>
                )}
            </div>
        </div>
    )
}

export { Profile }
