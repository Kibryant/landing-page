import { SubmitHandler, useForm } from 'react-hook-form'
import { UserMongooseDocument } from '@/types/UserMongooseDocument'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserSchemaInput, updateUserSchema } from '@/schemas/updateUserSchema'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { useState } from 'react'

const useUpdateUser = () => {
    const userStorage = localStorage.getItem('client-system')
    const [messageFromApi, setMessageFromApi] = useState<{ error: null | string; sucess: null | string }>({
        error: null,
        sucess: null,
    })

    let user: UserMongooseDocument | null = null

    if (userStorage) {
        user = JSON.parse(userStorage)
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm<UpdateUserSchemaInput>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            newEmail: user?.email,
            newUsername: user?.username,
        },
    })

    const handleSubmitUpdateUser: SubmitHandler<UpdateUserSchemaInput> = async ({
        newEmail,
        newUsername,
        newPassword,
        currentPassword,
    }) => {
        try {
            await fetch('/api/clients/update', {
                method: 'PUT',
                body: JSON.stringify({
                    email: user && user?.email,
                    newEmail,
                    currentPassword: currentPassword ?? '',
                    newUsername,
                    newPassword,
                }),
            }).then(async (result) => {
                const res = await result.json()

                if (res.status !== HttpStatusCode.OK) {
                    setMessageFromApi({
                        error: res.message,
                        sucess: '',
                    })
                    return
                }

                setMessageFromApi({
                    error: '',
                    sucess: res.message,
                })
                localStorage.setItem('client-system', JSON.parse(res.data))
            })
        } catch (err) {
            console.log(err)
        }
    }

    return {
        handleSubmitUpdateUser,
        register,
        handleSubmit,
        errors,
        isLoading,
        messageFromApi,
    }
}

export { useUpdateUser }
