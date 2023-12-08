import Message from '@/core/message/entity/Message'

export default interface MessageOperationResult<T extends Message | Message[]> {
    success: boolean
    message?: T
    error?: string
}
