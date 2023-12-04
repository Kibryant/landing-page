import { randomUUID } from 'crypto'

interface MessageProps {
    content: string
    senderId: string
    receiverId: string
    createdAt: Date
}

export default class Message {
    public id: string
    public content: string
    public senderId: string
    public receiverId: string
    public createdAt: Date

    constructor(props: MessageProps, id?: string) {
        this.id = id ?? randomUUID()
        this.content = props.content
        this.senderId = props.senderId
        this.receiverId = props.receiverId
        this.createdAt = props.createdAt
    }
}
