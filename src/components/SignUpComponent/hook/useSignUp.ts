import { HttpStatusCode } from '@/types/HttpStatusCode'
import { ResProps } from '@/types/class/Response'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-toastify/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpSchemaInput, signUpSchema } from '@/schemas/signUp.schema'
import { UserProps } from '@/types/UserProps'

const useSignUp = () => {
    const router = useRouter()
    const { data: session } = useSession()

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
        mode: 'onSubmit',
        defaultValues: {
            email: session?.user?.email ? session.user.email : '',
            username: session?.user?.name ? session.user.name : '',
            password: '',
            passwordConfirm: '',
        },
    })

    const handleSignUp: SubmitHandler<SignUpSchemaInput> = async ({ email, password, username }) => {
        try {
            await fetch('/api/auth/register', {
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
                const res: ResProps<UserProps> = await result.json()
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
    }
}
export { useSignUp }
