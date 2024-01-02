'use client'
import Post from '@/core/post/entity/Post'
import { ChatBubbleLeftIcon, EllipsisHorizontalIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { SplitSquareVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'

interface PostsListProps {
    posts: Post[]
}

const PostsLists = ({ posts }: PostsListProps) => {
    return (
        <div className="flex flex-col gap-y-6">
            {posts.map((post, index) => (
                <div key={index} className="w-full flex max-w-md gap-y-3 flex-col">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-x-1">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>

                            <div>
                                <h4 className="text-sm font-semibold">John Doe</h4>
                                <p className="text-sm">lorem</p>
                            </div>
                        </div>
                        <EllipsisHorizontalIcon className="h-6 w-6" />
                    </div>
                    <div className="w-full max-w-md">
                        <Image
                            src={post.url ?? ''}
                            alt={post.title}
                            quality={100}
                            width={500}
                            height={600}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="flex gap-x-3">
                            <button>
                                <HeartIcon className="h-6 w-6" />
                            </button>
                            <button>
                                <ChatBubbleLeftIcon className="h-6 w-6" />
                            </button>
                            <button>
                                <PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
                            </button>
                        </div>
                        <div>
                            <SplitSquareVerticalIcon className="h-6 w-6" />
                        </div>
                    </div>
                    <div>
                        <p>Liked by...</p>
                    </div>
                    <div className="flex gap-x-1">
                        <p className="font-bold">John Doe</p>
                        <p>{post.title}</p>
                    </div>
                    <div>
                        <p>View all 10 comments</p>
                        <input
                            type="text"
                            className="flex h-10 w-full rounded-md bg-transparent text-sm file:font-medium placeholder:text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Add a comment..."
                        />
                        <p>
                            {format(
                                new Date(post.createdAt.seconds * 1000 + post.createdAt.nanoseconds / 1000000),
                                'dd/MM/yyyy HH:mm:ss',
                            )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export { PostsLists }
