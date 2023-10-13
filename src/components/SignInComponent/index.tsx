'use client'
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
import { useSignIn } from './hook/useSignIn'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import Logo from '../Logo'
const SignInComponent = () => {
    const { errors, handleSignIn, isLoading, messageFromApi, register, handleSubmit } = useSignIn()

    return (
        <>
            <form
                className="flex flex-col justify-center items-center gap-y-6 md:gap-y-8 w-full rounded-lg max-w-xl p-8 border"
                onSubmit={handleSubmit(handleSignIn)}
            >
                <div className="block md:hidden">
                    <Logo isNavbar={false} />
                </div>
                {messageFromApi.error.length > 0 && (
                    <span className="text-red-500 text-xs">{messageFromApi.error}</span>
                )}
                <div className="w-full flex flex-col justify-start gap-y-2 md:flex-row md:gap-x-2 md:justify-center">
                    <label htmlFor="email">
                        <EnvelopeIcon className="h-8 w-8 text-primary hidden md:block" />
                        <span className="block md:hidden">Oie</span>
                    </label>
                    <input
                        type="email"
                        {...register('email')}
                        id="email"
                        placeholder="Your email..."
                        className="bg-transparent border border-brandPink w-full rounded-md p-2 outline-none"
                        autoComplete="off"
                        required
                    />
                </div>
                {!!errors.email?.message && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                <div className="w-full flex flex-col justify-start gap-y-2 md:flex-row md:gap-x-2 md:justify-center">
                    <label htmlFor="username">
                        <UserIcon className="h-8 w-8 text-primary hidden md:block" />
                        <span className="block md:hidden">Oie</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        {...register('username')}
                        placeholder="Your username..."
                        className="bg-transparent border border-brandPink w-full rounded-md p-2 outline-none"
                        autoComplete="off"
                        required
                    />
                </div>
                {!!errors.username?.message && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                <div className="w-full flex flex-col justify-start gap-y-2 md:flex-row md:gap-x-2 md:justify-center">
                    <label htmlFor="password">
                        <LockClosedIcon className="h-8 w-8 text-primary hidden md:block" />
                        <span className="block md:hidden">Oie</span>
                    </label>
                    <input
                        type="password"
                        {...register('password')}
                        id="password"
                        placeholder="Your password..."
                        className="bg-transparent border border-brandPink w-full rounded-md py-1 px-2 outline-none"
                        autoComplete="off"
                        required
                    />
                </div>
                {!!errors.password?.message && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                <div className="w-full flex flex-col justify-start gap-y-2 md:flex-row md:gap-x-2 md:justify-center">
                    <label htmlFor="confirmPassword">
                        <LockClosedIcon className="h-8 w-8 text-primary hidden md:block" />
                        <span className="block md:hidden">Oie</span>
                    </label>
                    <input
                        type="confirmPassword"
                        {...register('passwordConfirm')}
                        id="confirmPassword"
                        placeholder="Your confirmPassword..."
                        className="bg-transparent border border-brandPink w-full rounded-md p-2 outline-none"
                        autoComplete="off"
                        required
                    />
                </div>
                {!!errors.passwordConfirm?.message && (
                    <span className="text-red-500 text-xs">{errors.passwordConfirm.message}</span>
                )}

                <div className="flex gap-x-4">
                    <button className="flex group transition hover:border-primary items-center justify-center rounded-full p-2 border  hover:-translate-y-2">
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

                <div className="w-full flex justify-center items-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 bg-primary rounded-lg uppercase hover:bg-primary/90"
                    >
                        Sign-in
                    </button>
                </div>
                <span className="text-xs">
                    Don&apos;t have a account?{' '}
                    <Link href="/register" className="uppercase font-bold">
                        Register
                    </Link>{' '}
                </span>
            </form>
        </>
    )
}

export { SignInComponent }
