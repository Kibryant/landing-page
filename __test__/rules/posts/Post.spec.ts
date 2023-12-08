import Post from '@/core/posts/entity/Post'

describe('Post', () => {
    it('should be able to create a new post', () => {
        const post = Post.create(
            {
                authorId: 'any_author',
                content: 'any_content',
                title: 'any_title',
                comments: ['comments', 'comments2'],
            },
            'any_id',
        )

        expect(post).toBeTruthy()
        expect(post.title).toBe('any_title')
        expect(post.content).toBe('any_content')
        expect(post.author).toBe('any_author')
        expect(post.comments).toStrictEqual(['comments', 'comments2'])
        expect(post.id).toBe('any_id')
    })

    it('should be able to create a new post without id', () => {
        const post = Post.create({
            authorId: 'any_author',
            content: 'any_content',
            title: 'any_title',
            comments: ['comments', 'comments2'],
        })

        expect(post).toBeTruthy()
        expect(post.title).toBe('any_title')
        expect(post.content).toBe('any_content')
        expect(post.author).toBe('any_author')
        expect(post.comments).toStrictEqual(['comments', 'comments2'])
        expect(post.id).toBeTruthy()
    })
})
