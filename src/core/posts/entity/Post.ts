import Entity from '@/core/shared/Entity'
import CreatePostDto from '../dtos/CreatePostDto'

export default class Post extends Entity {
    private _title: string
    private _content: string
    private _authorId: string
    private _comments: string[]

    constructor({ authorId, content, title, comments }: CreatePostDto, id?: string) {
        super(id)
        this._title = title
        this._content = content
        this._authorId = authorId
        this._comments = comments
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
}
