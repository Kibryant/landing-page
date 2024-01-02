'use client'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { ResProps } from '@/types/ResProps'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-toastify/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserMongooseDocument } from '@/types/UserMongooseDocument'
import { SignUpSchemaInput, signUpSchema } from '@/schemas/zod/signUp.schema'
import { auth, googleProvider } from '@/external/database/connections/firebase/config'
import { signInWithPopup } from 'firebase/auth'

const useSignUp = () => {
    const router = useRouter()
    const [messageFromApi, setMessageFromApi] = useState({
        error: '',
        success: '',
    })

    const {
        handleSubmit,
        register,
        formState: { errors, isLoading },
    } = useForm<SignUpSchemaInput>({
        resolver: zodResolver(signUpSchema),
        mode: 'all',
        criteriaMode: 'all',
        defaultValues: {
            email: '',
            username: '',
            password: '',
            passwordConfirm: '',
        },
    })

    const handleSignUp: SubmitHandler<SignUpSchemaInput> = async ({ email, password, username, photoURL }) => {
        try {
            await fetch('/api/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    photoURL,
                }),
            }).then(async (result) => {
                const res: ResProps<UserMongooseDocument> = await result.json()
                if (res.status !== HttpStatusCode.CREATED) {
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
                localStorage.setItem('client-system', JSON.stringify(res.data))
                router.push('/clients')
            })
        } catch (error) {
            console.log('error', error)
            if (error instanceof Error) {
                setMessageFromApi({
                    error: `Error! ${error.message}`,
                    success: '',
                })
            }

            setMessageFromApi({
                error: `Error! ${error}`,
                success: '',
            })
        }
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)

            if (!result.user) {
                return console.log('Something went wrong!')
            }

            const { uid, displayName, email, photoURL } = result.user
            handleSignUp({
                email: email || '',
                password: uid,
                username: displayName || 'Google User',
                passwordConfirm: uid,
                photoURL: photoURL || '',
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
        handleSignUp,
        signInWithGoogle,
    }
}
export { useSignUp }
