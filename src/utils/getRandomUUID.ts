import * as cryptoServer from 'crypto'
import { randomUUID } from 'node:crypto'

function getRandomUUID() {
    if (typeof window === 'undefined') {
        return cryptoServer.randomBytes(16).toString('hex')
    }
    return randomUUID()
}

export { getRandomUUID }
