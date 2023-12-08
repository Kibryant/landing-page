import User from '@/core/user/entity/User'
import { Document } from 'mongoose'

type UserMongooseDocument = Document & User

export type { UserMongooseDocument }
