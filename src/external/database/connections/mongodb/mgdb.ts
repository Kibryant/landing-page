import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

async function connectMongoDb() {
    try {
        const opts = {}

        const connection = await mongoose.connect(MONGODB_URI, opts)

        return connection
    } catch (error) {
        throw new Error('Failed to connect to MongoDB')
    }
}

export { connectMongoDb }
