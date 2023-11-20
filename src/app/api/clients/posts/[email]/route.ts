import { pg } from '@/core/pg'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { UUID } from 'crypto'
import { NextResponse } from 'next/server'

interface PostsProps {
    id: UUID
    postName: string
    description: string
    created_at: Date
    author: string
    content: string
}

export async function POST(req: Request, { params: { email } }: { params: { email: string } }) {
    const body: PostsProps = await req.json()
    const post = body
    post.created_at = new Date()
    const newPost = await pg.posts.create({
        data: {
            ...post,
            author: email,
        },
    })

    return NextResponse.json({
        status: HttpStatusCode.OK,
        message: 'sucess post',
        data: newPost,
        error: false,
    })
}
