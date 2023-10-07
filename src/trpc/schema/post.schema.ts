import { z } from 'zod'

export const createPostSchema = z.object({
    author: z.string({
        required_error: 'Email user is required',
    }),
    title: z.string({
        required_error: 'Title is required',
    }),
    description: z.string({
        required_error: 'Title is required',
    }),
    content: z.string({
        required_error: 'Content is required',
    }),
    category: z.string({
        required_error: 'Category is required',
    }),
    published: z.boolean({
        required_error: 'Published is required',
    }),
})

export const getPostSchema = z.object({
    author: z.string({
        required_error: 'Email user is required',
    }),
    title: z.string({
        required_error: 'Title is required',
    }),
    description: z.string({
        required_error: 'Title is required',
    }),
    content: z.string({
        required_error: 'Content is required',
    }),
    category: z.string({
        required_error: 'Category is required',
    }),
    published: z.boolean({
        required_error: 'Published is required',
    }),
    createdAt: z.date(),
})

export type CreatePostInput = z.input<typeof createPostSchema>
export type CreatePostOutput = z.input<typeof createPostSchema>
