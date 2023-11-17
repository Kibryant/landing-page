import { publicProcedure, router } from './trpc'
import { createPostSchema } from './schema/post.schema'

export const appRouter = router({
    createPosts: publicProcedure.input(createPostSchema).mutation(async ({ input, ctx }) => {
        const { title, category, content, description, published, author } = input
        const createdPost = await ctx.pg.posts.create({
            data: {
                title,
                content,
                category,
                description,
                published,
                author,
            },
        })

        return {
            createdPost,
        }
    }),
    getAllPostsTrpc: publicProcedure.query(async ({ ctx }) => {
        const allPosts = await ctx.pg.posts.findMany()

        return {
            allPosts,
        }
    }),
})

export type AppRouterProps = typeof appRouter
