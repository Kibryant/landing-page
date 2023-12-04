'use client'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { ResProps } from '@/types/ResProps'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const useSignIn = () => {
    const router = useRouter()

    const [messageFromApi, setMessageFromApi] = useState({
        error: '',
        success: '',
    })

    const signInSchema = z
        .object({
            email: z.string().email(),
            username: z.string().min(5, { message: 'The username must contain 5 digits!' }),
            password: z
                .string()
                .min(1, 'Password is required')
                .min(8, 'Password must be more than 8 characters')
                .max(32, 'Password must be less than 32 characters'),
            passwordConfirm: z.string().min(1, 'Please confirm your password'),
        })
        .refine((data) => data.password === data.passwordConfirm, {
            path: ['passwordConfirm'],
            message: 'Passwords do not match',
        })

    type SignInSchemaInput = z.input<typeof signInSchema>

    const {
        handleSubmit,
        register,
        formState: { errors, isLoading },
    } = useForm<SignInSchemaInput>({
        resolver: zodResolver(signInSchema),
        mode: 'onSubmit',
    })

    const handleSignIn: SubmitHandler<SignInSchemaInput> = async ({ email, password, username }) => {
        try {
            await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                }),
            }).then(async (result) => {
                const res: ResProps = await result.json()
                console.log(res)
                if (res.status !== HttpStatusCode.OK) {
                    setMessageFromApi({
                        error: res.message,
                        success: '',
                    })
                    return
                }
                setMessageFromApi({
                    error: '',
                    success: res.message,
                })

                console.log('aqui')

                localStorage.setItem('client-system', JSON.stringify(res.data))
                router.push('/clients')
            })
        } catch (error) {
            setMessageFromApi({
                error: `Error! ${error}`,
                success: '',
            })
        }
    }

    return {
        errors,
        messageFromApi,
        isLoading,
        register,
        handleSubmit,
        handleSignIn,
    }
}

export { useSignIn }
