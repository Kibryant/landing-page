import CreateTaskDto from '@/core/task/dtos/CreateTaskDto'
import CreateUserDto from '../../dtos/CreateUserDto'
import UpdateUserDto from '../../dtos/UpdateUserDto'
import User, { UserFriend } from '../../entity/User'
import Task from '@/core/task/entity/Task'
import { type FriendOperationResult } from '@/types/res/FriendOperation'
import type MessageOperationResult from '@/types/res/MessageOperation'
import { Response } from '@/types/class/Response'
import Message from '@/core/message/entity/Message'
import TaskOperationResult from '@/types/res/TaskOperation'

export abstract class UserRepository {
    abstract getUserByEmail(email: string): Promise<User | null>
    abstract getUserById(id: string): Promise<User | null>
    abstract getUserByUsername(username: string): Promise<User | null>
    abstract createNewUser(user: CreateUserDto): Promise<Response<User | null>>
    abstract updateUser(userId: string, updatedFields: UpdateUserDto): Promise<User | null>
    abstract addNewTaskToUser(userId: string, task: CreateTaskDto): Promise<TaskOperationResult<Task>>
    abstract getAllTasksByUserId(userId: string): Promise<TaskOperationResult<Task[]>>
    abstract sentMessageToAnotherUser(
        senderId: string,
        receiverId: string,
        content: string,
    ): Promise<MessageOperationResult<Message>>

    abstract receivedMessages(receiverId: string): Promise<MessageOperationResult<Message[]>>
    abstract getAllSentMessagesByUserId(userId: string): Promise<MessageOperationResult<Message[]>>
    abstract getAllUsers(): Promise<User[]>
    abstract addNewFriend(userId: string, friendId: string): Promise<FriendOperationResult>
    abstract sentFriendRequest(senderId: string, receiverId: string): Promise<FriendOperationResult>
    abstract getAllFriends(userId: string): Promise<UserFriend[] | null>
    abstract getAllFriendsRequest(userId: string): Promise<UserFriend[] | null>
}
