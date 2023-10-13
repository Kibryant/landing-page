import mongoose, { Model } from 'mongoose'
import { UserProps } from '@/types/UserProps'

const { Schema } = mongoose
type UserModelProps = Model<UserProps>

const userSchema = new Schema<UserProps>(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, require: true, unique: true },
        password: { type: String, required: true },
        tasks: [
            {
                task: {
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    required: true,
                },
                description: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true },
)

const UserModel: UserModelProps = mongoose.models.User || mongoose.model('User', userSchema)

export default UserModel
