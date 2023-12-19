import { ForYou } from '@/components/Posts/ForYou'
import { Header } from '@/components/Posts/Header'
import { PostsLists } from '@/components/Posts/PostsList'
import { Profile } from '@/components/Posts/Profile'
import { Section } from '@/components/Section'
import Post from '@/core/post/entity/Post'
import { db } from '@/external/database/connections'
import { collection, getDocs } from 'firebase/firestore'

const Page: React.FC = async () => {
    const getPosts = async () => {
        const postsCollection = collection(db, 'posts')
        const postSnapshot = await getDocs(postsCollection)
        const postList = postSnapshot.docs.map((doc) => doc.data())
        return postList
    }

    const posts = (await getPosts()) as Post[]

    return (
        <div className="flex">
            <Header />
            <main className="w-full mt-20 relative">
                <Section className="flex justify-center">
                    <PostsLists posts={posts} />
                </Section>
                <div className="absolute right-20 w-60 flex flex-col justify-start items-start gap-y-6 -top-12">
                    <Profile />
                    <ForYou />
                </div>
            </main>
        </div>
    )
}

export default Page
