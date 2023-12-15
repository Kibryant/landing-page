import mongoose, { Model } from 'mongoose'
import { UserMongooseDocument } from '@/types/UserMongooseDocument'

const { Schema } = mongoose
type UserModelProps = Model<UserMongooseDocument>

const userSchema = new Schema<UserMongooseDocument>(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, require: true, unique: true },
        password: { type: String, required: true },
        tasks: [{ type: Schema.Types.Mixed }],
        sentMessages: [{ type: Schema.Types.Mixed }],
        receivedMessages: [{ type: Schema.Types.Mixed }],
        friends: [{ type: Schema.Types.Mixed }],
        friendsRequests: [{ type: Schema.Types.Mixed }],
    },
    { timestamps: true },
)

const UserModel: UserModelProps = mongoose.models.User || mongoose.model('User', userSchema)

export default UserModel
