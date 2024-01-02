import Entity from '@/core/shared/Entity'
import CreatePostDto from '../dtos/CreatePostDto'
import StringValidator from '@/core/shared/StringValidator'

export default class Post extends Entity {
    private _title: string
    private _content: string
    private _authorId: string
    private _comments: string[] = []
    private _url?: string
    private readonly _createdAt!: {
        seconds: number
        nanoseconds: number
    }

    constructor({ authorId, content, title, url }: CreatePostDto, id?: string) {
        super(id)
        this._title = new StringValidator(title, 'title').input
        this._content = new StringValidator(content, 'content').input
        this._url = url

        if (!authorId || authorId.length === 0) {
            throw new Error('The authorId is required.')
        }

        this._authorId = authorId
    }

    static create(props: CreatePostDto, id?: string): Post {
        return new Post(props, id)
    }

    get title(): string {
        return this._title
    }

    get content(): string {
        return this._content
    }

    get author(): string {
        return this._authorId
    }

    get comments(): string[] {
        return this._comments
    }

    get url(): string | undefined {
        return this._url
    }

    get createdAt(): {
        seconds: number
        nanoseconds: number
    } {
        return this._createdAt
    }

    addComment(comment: string): void {
        this._comments.push(comment)
    }

    removeComment(comment: string): void {
        const index = this._comments.indexOf(comment)
        if (index > -1) {
            this._comments.splice(index, 1)
        }
    }

    updateComment(oldComment: string, newComment: string): void {
        const index = this._comments.indexOf(oldComment)
        if (index > -1) {
            this._comments[index] = newComment
        }
    }

    updateContent(content: string): void {
        this._content = content
    }

    updateTitle(title: string): void {
        this._title = title
    }

    updateAuthor(authorId: string): void {
        this._authorId = authorId
    }

    toObject(): Record<string, unknown> {
        return {
            id: this.id,
            title: this._title,
            content: this._content,
            authorId: this._authorId,
            comments: this._comments,
            url: this._url,
        }
    }
}
