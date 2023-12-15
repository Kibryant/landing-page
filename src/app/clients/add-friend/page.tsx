'use client'

import { FC, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { getUserLocalStorage } from '@/utils'
import { Input } from '@/components/ui/input'
import { HttpStatusCode } from '@/types/HttpStatusCode'

const addFriendValidator = z.object({
    email: z.string().email(),
})
type FormData = z.infer<typeof addFriendValidator>

const AddFriendButton: FC = () => {
    const [showSuccessState, setShowSuccessState] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string>('')
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

            const req = await fetch('/api/clients/friends/add', {
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

            const res = await req.json()

            if (res.status !== HttpStatusCode.OK) {
                setErrorMessages(res.message)
                return
            }

            // await axios.post('/api/clients/friends/add', {
            //     email: validatedEmail,
            //     senderId: user?._id as string,
            //     senderEmail: user?.email as string,
            // })

            setShowSuccessState(true)
        } catch (error) {
            console.log('error', error)
            if (error instanceof z.ZodError) {
                setError('email', { message: error.message })
                return
            }

            if (error instanceof Error) {
                setError('email', { message: error.message })
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
            <label htmlFor="email" className="block text-lg font-medium leading-6">
                Add friend by E-Mail
            </label>

            <div className="mt-2 flex gap-4">
                <Input {...register('email')} type="text" className="" placeholder="you@example.com" />
                <Button type="submit">Add</Button>
            </div>
            <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
            <p className="mt-1 text-sm text-red-600">{errorMessages.length > 0 && errorMessages}</p>
            {showSuccessState ? <p className="mt-1 text-sm text-green-600">Friend request sent!</p> : null}
        </form>
    )
}

export default AddFriendButton
