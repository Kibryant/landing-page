'use client'
import { trpc } from '@/app/_trpc/client'
import { Posts as PostsComponent } from '@/components/Clients/Posts'

const Posts = () => {
    const { data } = trpc.getAllPosts.useQuery()
    return <PostsComponent posts={data?.allPosts} />
}

export default Posts