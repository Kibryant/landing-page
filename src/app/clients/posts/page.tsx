import { Posts as PostsComponent } from '@/components/Clients/Posts'
import { pg } from '@/core/pg'

const Posts = async () => {
    const posts = await pg.posts.findMany()
    return <PostsComponent posts={posts} />
}

export default Posts
