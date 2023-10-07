'use client'

import { Section } from '@/components/Section'
import { PlusIcon, WalletIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { format } from 'date-fns'
import { trpc } from '@/app/_trpc/client'
import { CreatePostOutput } from '@/trpc/schema/post.schema'

interface PostsProps {
    posts: CreatePostOutput[] | undefined
}

const Posts = ({ posts }: PostsProps) => {
    const { data, isLoading, mutateAsync: createPosts } = trpc.createPosts.useMutation()

    const handlePosts = async () => {
        await createPosts({
            title: 'ARTHUR É LINDO dms',
            category: 'AAAAA',
            content: 'AAAAAAA',
            description: 'SEXO AO VIVassooo',
            published: true,
            author: 'arthu@gmail.com',
        })
    }

    return (
        <>
            <button onClick={handlePosts}>OIE</button>
            <Section>
                <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 sm:flex-row sm:items-center sm:gap-0">
                    <h1 className="mb-3 font-semibold text-5xl text-gray-900">Posts</h1>
                </div>
            </Section>
            <Section>
                <ul className="grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
                    {posts &&
                        posts?.length &&
                        posts.map((post) => (
                            <>
                                <li
                                    key={post.content}
                                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
                                >
                                    <Link href={`/dashboard`} className="flex flex-col gap-2">
                                        <div className="py-6 px-6 flex w-full items-center justify-between space-x-6">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                                            <div className="flex-1 truncate">
                                                <div className="flex flex-col items-start justify-center">
                                                    <h3 className="truncate text-lg font-medium text-zinc-900">
                                                        {post.content}
                                                    </h3>
                                                    <h3 className="truncate text-xs font-medium text-zinc-600">
                                                        {post.description}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <div className="mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <PlusIcon className="h-4 w-4" />
                                        {/* {format(new Date(post.createdAt), 'MMM yyyy')} */}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <WalletIcon className="h-4 w-4" />
                                        Mocked
                                    </div>
                                </div>
                            </>
                        ))}
                </ul>
            </Section>
        </>
    )
}

export { Posts }
