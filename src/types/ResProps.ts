interface ResProps<T = undefined> {
    status: number
    error: boolean
    message: string
    data: T | null
}

export type { ResProps }
