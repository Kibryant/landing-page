import Post from '@/core/post/entity/Post'

describe('Post', () => {
    it('should be able to create a new post', () => {
        const post = Post.create(
            {
                authorId: 'any_author',
                content: 'any_content',
                title: 'any_title',
                comments: [],
            },
            'any_id',
        )

        expect(post).toBeTruthy()
        expect(post.title).toBe('any_title')
        expect(post.content).toBe('any_content')
        expect(post.author).toBe('any_author')
        expect(post.comments).toStrictEqual([])
        expect(post.id).toBe('any_id')
    })

    it('should be able to create a new post without id', () => {
        const post = Post.create({
            authorId: 'any_author',
            content: 'any_content',
            title: 'any_title',
            comments: [],
        })

        expect(post).toBeTruthy()
        expect(post.title).toBe('any_title')
        expect(post.content).toBe('any_content')
        expect(post.author).toBe('any_author')
        expect(post.comments).toStrictEqual([])
        expect(post.id).toBeTruthy()
    })

    it('should be able to tansform the post in object', () => {
        const post = Post.create({
            authorId: 'any_author',
            content: 'any_content',
            title: 'any_title',
            comments: [],
        })

        expect(post.toObject()).toStrictEqual({
            id: post.id,
            title: 'any_title',
            content: 'any_content',
            authorId: 'any_author',
            comments: [],
        })
    })

    it('should add comments to a post', () => {
        const post = Post.create({
            authorId: 'any_author',
            content: 'any_content',
            title: 'any_title',
            comments: [],
        })

        post.addComment('any_comment')

        expect(post.comments).toStrictEqual(['any_comment'])
    })

    it('should remove comments from a post', () => {
        const post = Post.create({
            authorId: 'any_author',
            content: 'any_content',
            title: 'any_title',
            comments: ['any_comment'],
        })

        post.removeComment('any_comment')

        expect(post.comments).toStrictEqual([])
    })

    it('should update comments from a post', () => {
        const post = Post.create({
            authorId: 'any_author',
            content: 'any_content',
            title: 'any_title',
            comments: ['any_comment'],
        })

        post.updateComment('any_comment', 'updated_comment')

        expect(post.comments).toStrictEqual(['updated_comment'])
    })

    it('should update content from a post', () => {
        const post = Post.create({
            authorId: 'any_author',
            content: 'any_content',
            title: 'any_title',
            comments: [],
        })

        post.updateContent('updated_content')

        expect(post.content).toBe('updated_content')
    })

    it('should update title from a post', () => {
        const post = Post.create({
            authorId: 'any_author',
            content: 'any_content',
            title: 'any_title',
            comments: [],
        })

        post.updateTitle('updated_title')

        expect(post.title).toBe('updated_title')
    })

    it('should update author from a post', () => {
        const post = Post.create({
            authorId: 'any_author',
            content: 'any_content',
            title: 'any_title',
            comments: [],
        })

        post.updateAuthor('updated_author')

        expect(post.author).toBe('updated_author')
    })

    it('should not be able to create a new post without authorId', () => {
        expect(() =>
            Post.create({
                authorId: '',
                content: 'any_content',
                title: 'any_title',
                comments: [],
            }),
        ).toThrowError('The authorId is required.')
    })

    it('should not be able to create a new post without content', () => {
        expect(() =>
            Post.create({
                authorId: 'any_author',
                content: '',
                title: 'any_title',
                comments: [],
            }),
        ).toThrowError('The content must have more than 2 letters.')
    })

    it('should not be able to create a new post with title.length < 3', () => {
        expect(() =>
            Post.create({
                authorId: 'any_author',
                content: 'any_content',
                title: 'a',
                comments: [],
            }),
        ).toThrowError('The title must have more than 2 letters.')
    })

    it('should not be able to create a new post with title consisting only of special characters', () => {
        expect(() =>
            Post.create({
                authorId: 'any_author',
                content: 'any_content',
                title: '!!!',
                comments: [],
            }),
        ).toThrowError('The title cannot consist only of special characters.')
    })
})
