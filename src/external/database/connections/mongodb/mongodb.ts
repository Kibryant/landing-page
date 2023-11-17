import { MongoClient } from 'mongodb'

interface GlobalWithMongoClientPromise {
    _mongoClientPromise?: Promise<MongoClient>
}

declare const global: GlobalWithMongoClientPromise

const uri = process.env.MONGODB_URI
const options = {}

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let client = new MongoClient(uri, options)
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV !== 'production') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }

    clientPromise = global._mongoClientPromise
} else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clientPromise = client.connect()
}

export default clientPromise
