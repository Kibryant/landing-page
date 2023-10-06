import mongoose from 'mongoose'

export default async function connect() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await mongoose.connect(process.env.MONGODB_URI!)
    } catch (error) {
        throw new Error(`ERROR; ${error}`)
    }
}
