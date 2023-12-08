import Entity from '@/core/shared/Entity'

interface MessageProps {
    content: string
    senderId: string
    receiverId: string
    createdAt: Date
}

export default class Message extends Entity {
    private _content: string
    private _senderId: string
    private _receiverId: string
    private _createdAt: Date

    constructor({ content, receiverId, createdAt, senderId }: MessageProps, id?: string) {
        super(id)
        this._content = content
        this._senderId = senderId
        this._receiverId = receiverId
        this._createdAt = createdAt
    }

    static create(props: MessageProps, id?: string): Message {
        return new Message(props, id)
    }

    get receiverId(): string {
        return this._receiverId
    }

    get content(): string {
        return this._content
    }

    get senderId(): string {
        return this._senderId
    }

    get createdAt(): Date {
        return this._createdAt
    }
}
