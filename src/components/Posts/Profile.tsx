import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
    showEdit?: boolean
}

const Profile: React.FC<Props> = ({ showEdit }) => {
    return (
        <div className="flex gap-x-2 w-full">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col justify-start">
                    <span className="text-sm">John Doe</span>
                    <span className="text-xs text-muted-foreground">@johndoe</span>
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
