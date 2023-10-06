import { HandleChangeProps } from '@/types/HandleChangeProps'
import { HandleSubmitProps } from '@/types/HandleSubmitProps'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { ResProps } from '@/types/ResProps'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import 'react-toastify/ReactToastify.css'

const useSignUp = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')
    const notifyError = (msg: string) => toast.error(msg)

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    })

    const [message, setMessageErro] = useState('')
    const [isFormSubmitting, setFormSubmitting] = useState(false)

    const handleChangeInputs: HandleChangeProps = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit: HandleSubmitProps = async (e) => {
        e.preventDefault()
        setFormSubmitting(true)
        if (form.email.length <= 6) {
            setMessageErro('Invalid Email!')
            setFormSubmitting(false)
            return
        }

        if (!form.email.includes('@') || !form.email.includes('.com')) {
            setMessageErro('Invalid Email!')
            setFormSubmitting(false)
            notifyError('Invalid Email!')
            return
        }

        if (form.username.length <= 6) {
            setMessageErro('The user must have more than 6 characters!')
            setFormSubmitting(false)
            notifyError('The user must have more than 6 characters!')
            return
        }

        if (form.password.length <= 5) {
            setMessageErro('The password must haver more than 5 characters!')
            setFormSubmitting(false)
            return
        }

        setMessageErro('')
        try {
            await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: form.email,
                    username: form.username,
                    password: form.password,
                }),
            }).then(async (result) => {
                const res: ResProps = await result.json()

                if (res.status !== HttpStatusCode.OK) {
                    setFormSubmitting(false)
                    setMessageErro(res.message)
                    return
                }

                localStorage.setItem('client-system', JSON.stringify(res.data))
                router.push(origin ? `/${origin}` : '/clients')
                setFormSubmitting(false)
            })
        } catch (error) {
            setFormSubmitting(false)
            notifyError(`Error!`)
        }
    }

    return {
        message,
        isFormSubmitting,
        handleSubmit,
        handleChangeInputs,
    }
}

export { useSignUp }
