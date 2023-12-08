import Message from '@/core/message/entity/Message'

describe('Message', () => {
    it('should be able to create a message', () => {
        const message = new Message({
            content: 'hello, world',
            createdAt: new Date(),
            senderId: '1234',
            receiverId: '122442342',
        })

        expect(message).toBeInstanceOf(Message)
        expect(message.content).toBe('hello, world')
        expect(message.createdAt).toBeInstanceOf(Date)
        expect(message.senderId).toBe('1234')
        expect(message.id).toBeDefined()
        expect(message.receiverId).toBe('122442342')
    })

    it('should be able to create a message with id', () => {
        const message = new Message(
            {
                content: 'hello, world',
                createdAt: new Date(),
                senderId: '1234',
                receiverId: '122442342',
            },
            '1234',
        )

        expect(message).toBeInstanceOf(Message)
        expect(message.content).toBe('hello, world')
        expect(message.createdAt).toBeInstanceOf(Date)
        expect(message.senderId).toBe('1234')
        expect(message.id).toBe('1234')
        expect(message.receiverId).toBe('122442342')
    })

    it('should be able to create a message with id', () => {
        const message = Message.create(
            {
                content: 'hello, world',
                createdAt: new Date(),
                senderId: '1234',
                receiverId: '122442342',
            },
            '1234',
        )

        expect(message).toBeInstanceOf(Message)
        expect(message.content).toBe('hello, world')
        expect(message.createdAt).toBeInstanceOf(Date)
        expect(message.senderId).toBe('1234')
        expect(message.id).toBe('1234')
        expect(message.receiverId).toBe('122442342')
    })
})
