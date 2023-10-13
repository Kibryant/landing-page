'use client'

import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSignUp } from './hook/useSignUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import { Toaster } from 'sonner'
import { signIn } from 'next-auth/react'

const SignUpComponent = () => {
    const { errors, handleSignUp, isLoading, messageFromApi, register, handleSubmit } = useSignUp()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <>
            <form
                className="flex flex-col justify-center items-center gap-4 w-full rounded-md max-w-lg p-8 border border-primary"
                onSubmit={handleSubmit(handleSignUp)}
            >
                {messageFromApi.error.length > 0 && <span>{messageFromApi.error}</span>}
                <Toaster richColors closeButton />
                <div className="w-full flex gap-1 justify-between flex-col">
                    <label htmlFor="email">
                        <EnvelopeIcon className="h-8 w-8 text-primary" />
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        id="email"
                        placeholder="johndoe@example.com"
                        className="bg-transparent border-b border-primary w-full rounded-md p-2 outline-none text-sm placeholder:text-secondary-foreground"
                        autoComplete="off"
                        required
                    />
                </div>
                {!!errors.email?.message && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                <div className="w-full flex gap-1 justify-between flex-col">
                    <label htmlFor="username">
                        <UserIcon className="h-8 w-8 text-primary" />
                    </label>
                    <input
                        {...register('username')}
                        type="text"
                        id="username"
                        placeholder="JohnDurant"
                        className="bg-transparent border-b border-primary w-full rounded-md p-2 outline-none text-sm placeholder:text-secondary-foreground"
                        autoComplete="off"
                        required
                    />
                </div>
                {!!errors.username?.message && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                <div className="relative w-full flex gap-1 justify-between flex-col">
                    <label htmlFor="password">
                        <LockClosedIcon className="h-8 w-8 text-primary" />
                    </label>
                    <input
                        type={!isPasswordVisible ? 'password' : 'text'}
                        {...register('password')}
                        id="password"
                        placeholder="Secret!"
                        className="bg-transparent border-b border-primary  w-full rounded-md p-2 outline-none text-sm placeholder:text-secondary-foreground"
                        autoComplete="off"
                        required
                    />
                    {isPasswordVisible ? (
                        <EyeIcon
                            className="h-8 w-8 text-primary absolute right-0 top-1/2 cursor-pointer"
                            onClick={() => setIsPasswordVisible((prev) => !prev)}
                        />
                    ) : (
                        <EyeSlashIcon
                            className="h-8 w-8 text-primary absolute right-0 top-1/2 cursor-pointer"
                            onClick={() => setIsPasswordVisible((prev) => !prev)}
                        />
                    )}
                </div>
                {!!errors.password?.message && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                <div className="relative w-full flex gap-1 justify-between flex-col">
                    <label htmlFor="passwordConfirm">
                        <LockClosedIcon className="h-8 w-8 text-primary" />
                    </label>
                    <input
                        type="password"
                        {...register('passwordConfirm')}
                        id="passwordConfirm"
                        placeholder="Secret!"
                        className="bg-transparent border-b border-primary  w-full rounded-md p-2 outline-none text-sm placeholder:text-secondary-foreground"
                        autoComplete="off"
                        required
                    />
                </div>
                {!!errors.passwordConfirm?.message && (
                    <span className="text-red-500 text-xs">{errors.passwordConfirm.message}</span>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={() => signIn('google')}
                        className="flex group transition hover:border-primary items-center justify-center rounded-full p-2 border  hover:-translate-y-2"
                    >
                        <FontAwesomeIcon
                            icon={faGoogle}
                            className="w-5 h-5 group-hover:text-primary transition group-hover:translate-y-[-2px]"
                        />
                    </button>
                    <button className="flex group transition hover:border-primary items-center justify-center rounded-full p-2 border  hover:-translate-y-2">
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="w-5 h-5 group-hover:text-primary transition group-hover:translate-y-[-2px]"
                        />
                    </button>
                    <button className="flex group transition hover:border-primary items-center justify-center rounded-full p-2 border  hover:-translate-y-2">
                        <FontAwesomeIcon
                            icon={faApple}
                            className="w-5 h-5 group-hover:text-primary transition group-hover:translate-y-[-2px]"
                        />
                    </button>
                </div>

                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <button
                        type="submit"
                        className="w-full py-2 transition bg-primary font-medium rounded-md uppercase hover:tracking-widest disabled:bg-blue-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Sign Up'}
                    </button>
                    <span className="font-medium text-xs">
                        Have a account?
                        <Link
                            href="/signin"
                            className="uppercase hover:font-bold font-semibold underline text-primary ms-1"
                        >
                            Sign-In
                        </Link>{' '}
                    </span>
                </div>
            </form>
        </>
    )
}

export { SignUpComponent }
