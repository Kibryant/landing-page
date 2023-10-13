'use client'

import { AdmProps } from '@/types/AdmProps'
import { useState } from 'react'
import { type HandleChangeProps } from '@/types/HandleChangeProps'
import { type HandleSubmitProps } from '@/types/HandleSubmitProps'
import { CommandLineIcon, EnvelopeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { HttpStatusCode } from '@/types/HttpStatusCode'

type SignInAdmProps = Pick<AdmProps, 'accessCode' | 'email' | 'password'>

const SignInAdm = () => {
    const [formAdm, setFormAdm] = useState<SignInAdmProps>({
        accessCode: '',
        email: '',
        password: '',
    })

    const router = useRouter()

    const [isFormSubmitting, setFormSubmitting] = useState(false)
    const [messageError, setMessageError] = useState('')

    const handleChangeInputs: HandleChangeProps = (e) => {
        setFormAdm({
            ...formAdm,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit: HandleSubmitProps = async (e) => {
        e.preventDefault()
        setFormSubmitting(true)
        setMessageError('')

        try {
            await fetch('api/auth/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessCode: formAdm.accessCode,
                    email: formAdm.email,
                    password: formAdm.password,
                }),
            }).then(async (res) => {
                const result = await res.json()
                console.log(result)

                if (result.status !== HttpStatusCode.CREATED) {
                    setMessageError(result.message)
                    setFormSubmitting(false)
                    return
                }

                setFormSubmitting(false)
                localStorage.setItem('arthur-adm-system', formAdm.email)
                router.push('/adm')
            })
        } catch (error) {
            setFormSubmitting(false)
            setMessageError(`Error: ${error}`)
        }
    }

    return (
        <main className="min-h-screen w-full flex justify-center items-center">
            <form
                className="flex max-w-xl flex-col justify-center items-center gap-4 w-full rounded-md border p-4"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-bold">Acessar Painel</h2>
                {!!messageError && <span className="text-red-500 text-center">{messageError}</span>}
                <div className="w-full flex gap-1 flex-col justify-start">
                    <label htmlFor="accessCode" className="flex items-end gap-2">
                        <CommandLineIcon className="h-8 w-8" />
                        <span className="text-xs">Digite seu código de acesso...</span>
                    </label>
                    <input
                        onChange={handleChangeInputs}
                        name="accessCode"
                        id="accessCode"
                        type="password"
                        className="bg-transparent outline-none p-2 rounded-md border w-full"
                    />
                </div>
                <div className="w-full flex gap-1 flex-col justify-start">
                    <label htmlFor="email" className="flex items-end gap-2">
                        <EnvelopeIcon className="h-8 w-8 " />
                        <span className="text-xs ">Digite seu email..</span>
                    </label>
                    <input
                        onChange={handleChangeInputs}
                        type="text"
                        name="email"
                        id="email"
                        className="bg-transparent outline-none  p-2 rounded-md border  w-full"
                    />
                </div>
                <div className="w-full flex gap-1 flex-col justify-start">
                    <label htmlFor="password" className="flex items-end gap-2">
                        <ShieldCheckIcon className="h-8 w-8 " />
                        <span className="text-xs ">Digite sua senha...</span>
                    </label>
                    <input
                        onChange={handleChangeInputs}
                        type="password"
                        name="password"
                        id="password"
                        className="bg-transparent outline-none  p-2 rounded-md border  w-full"
                    />
                </div>
                <div className="w-full">
                    <button
                        type="submit"
                        className="uppercase w-full font-medium tracking-widest text-primary-foreground bg-primary py-2 px-4 rounded-md text-center"
                    >
                        Acessar
                    </button>
                </div>
            </form>
        </main>
    )
}

export { SignInAdm }
