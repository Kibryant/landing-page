'use client'

import axios, { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { getUserLocalStorage } from '@/utils'

export const addFriendValidator = z.object({
    email: z.string().email(),
})
type FormData = z.infer<typeof addFriendValidator>

const AddFriendButton: FC = () => {
    const [showSuccessState, setShowSuccessState] = useState<boolean>(false)
    const user = getUserLocalStorage()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(addFriendValidator),
    })

    const addFriend = async (email: string) => {
        try {
            const validatedEmail = addFriendValidator.parse({ email })
            console.log('validatedEmail', validatedEmail.email)

            await fetch('/api/clients/friends/add', {
                method: 'POST',
                body: JSON.stringify({
                    email: validatedEmail.email,
                    senderId: user?._id as string,
                    senderEmail: user?.email as string,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            // await axios.post('/api/clients/friends/add', {
            //     email: validatedEmail,
            //     senderId: user?._id as string,
            //     senderEmail: user?.email as string,
            // })

            console.log('friend request sent')

            setShowSuccessState(true)
        } catch (error) {
            console.log('error', error)
            if (error instanceof z.ZodError) {
                setError('email', { message: error.message })
                return
            }

            if (error instanceof AxiosError) {
                setError('email', { message: error.response?.data })
                return
            }

            setError('email', { message: 'Something went wrong.' })
        }
    }

    const onSubmit = (data: FormData) => {
        addFriend(data.email)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Add friend by E-Mail
            </label>

            <div className="mt-2 flex gap-4">
                <input
                    {...register('email')}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="you@example.com"
                />
                <Button type="submit">Add</Button>
            </div>
            <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
            {showSuccessState ? <p className="mt-1 text-sm text-green-600">Friend request sent!</p> : null}
        </form>
    )
}

export default AddFriendButton
