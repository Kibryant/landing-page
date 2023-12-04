import Message from '@/core/messages/entity/Message'

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
        expect(message.id).toBeDefined()
    })
})
