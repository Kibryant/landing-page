import { pg } from '@/core/pg'
import { inferAsyncReturnType } from '@trpc/server'

const createContext = () => {
    return {
        pg,
    }
}

export type Context = inferAsyncReturnType<typeof createContext>
export { createContext }
