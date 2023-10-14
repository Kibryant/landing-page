'use client'

import { HttpStatusCode } from '@/types/HttpStatusCode'
import { ResProps } from '@/types/ResProps'
import { useCallback, useEffect, useState } from 'react'
interface UseFetchProps<T> {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    bodyContent: T
    isAuthOrContent?: 'Authorization' | 'Content-Type'
}

interface UseFetchReturn<T> {
    data: T | null
    error?: string
    isLoading: boolean
}

const useFetch = <T>({ url, method, bodyContent }: UseFetchProps<T>): UseFetchReturn<T> => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T | null>(null)

    const handleFetch = useCallback(async () => {
        setIsLoading(true)
        try {
            const req = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bodyContent,
                }),
            })

            if (!req.ok) {
                setError(`${req.text}`)
                setIsLoading(false)
                return
            }

            const res: ResProps<T> = await req.json()

            if (res.status !== HttpStatusCode.OK) {
                setError(res.message)
                setIsLoading(false)
                return
            }

            setData(res.data)
            setError('')
            setIsLoading(false)
        } catch (error) {
            setError(`FATAL ERRO: ${error}`)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }, [url, bodyContent, method])

    useEffect(() => {
        handleFetch()
    }, [handleFetch])

    return { data, error, isLoading }
}

export { useFetch }
