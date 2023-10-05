import { HandleChangeProps } from '@/types/HandleChangeProps'
import { HandleSubmitProps } from '@/types/HandleSubmitProps'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useSignUp = () => {
    const router = useRouter()

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
            return
        }

        if (form.username.length <= 6) {
            setMessageErro('The user must have more than 6 characters!')
            setFormSubmitting(false)
            return
        }

        if (form.password.length <= 5) {
            setMessageErro('The password must haver more than 5 characters!')
            setFormSubmitting(false)
            return
        }

        setMessageErro('')
        console.log(form.username, form.email, form.password)
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
            }).then(async (res) => {
                const result = await res.json()
                console.log(result)

                if (result.status === 201) {
                    localStorage.setItem('client-system', JSON.stringify(result.data))
                    router.push('/clients')
                } else {
                    handleError(result.message)
                }
                setFormSubmitting(false)
            })
        } catch (error) {
            setFormSubmitting(false)
            handleError(`Error: ${error}`)
        }
    }

    const handleError = (msg: string) => {
        setMessageErro(msg)
        setTimeout(() => {
            setMessageErro('')
        }, 3000)
    }

    return {
        message,
        isFormSubmitting,
        handleSubmit,
        handleChangeInputs,
    }
}

export { useSignUp }
