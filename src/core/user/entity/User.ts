import Message from '@/core/message/entity/Message'
import Task from '@/core/task/entity/Task'

export interface UserFriend {
    _id?: string
    username: string
    email: string
}

export default interface User {
    _id?: string
    username: string
    photoURL?: string
    email: string
    password: string
    tasks?: Task[]
    friends?: UserFriend[]
    friendsRequests?: UserFriend[]
    createdAt?: Date
    updatedAt?: Date
    sentMessages?: Message[]
    receivedMessages?: Message[]
}

// export default class User {
//     private _id?: string
//     private _username: string
//     private _email: string
//     private _password: string
//     private _tasks?: Task[]
//     private _friends?: UserFriend[]
//     private _friendsRequests?: UserFriend[]
//     private _createdAt?: Date
//     private _updatedAt?: Date
//     private _sentMessages?: Message[]
//     private _receivedMessages?: Message[]

//     constructor({ username, email, password }: { username: string; email: string; password: string }) {
//         if (!EmailValidator.itsValid(email)) throw new Error('Invalid email')
//         this._username = username
//         this._email = email
//         this._password = password
//     }

//     get id() {
//         return this._id
//     }

//     get username() {
//         return this._username
//     }

//     get email() {
//         return this._email
//     }

//     get password() {
//         return this._password
//     }

//     get tasks() {
//         return this._tasks
//     }

//     get friends() {
//         return this._friends
//     }

//     get friendsRequests() {
//         return this._friendsRequests
//     }

//     get createdAt() {
//         return this._createdAt
//     }

//     get updatedAt() {
//         return this._updatedAt
//     }

//     get sentMessages() {
//         return this._sentMessages
//     }

//     get receivedMessages() {
//         return this._receivedMessages
//     }
// }
