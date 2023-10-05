'use client'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSignUp } from './hook/useSignUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'

const SignUpComponent = () => {
    const { handleChangeInputs, handleSubmit, message, isFormSubmitting } = useSignUp()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    return (
        <>
            <form
                className="flex flex-col justify-center items-center gap-4 w-full rounded-md max-w-lg p-8 border border-brandBlue"
                onSubmit={handleSubmit}
            >
                {message && <span className="text-red-500">{message}</span>}
                <div className="w-full flex gap-1 justify-between flex-col">
                    <label htmlFor="email">
                        <EnvelopeIcon className="h-8 w-8 text-brandBlue" />
                    </label>
                    <input
                        type="email"
                        onChange={handleChangeInputs}
                        name="email"
                        id="email"
                        placeholder="johndoe@example.com"
                        className="text-zinc-600 bg-transparent border-b border-brandBlue w-full rounded-md p-2 outline-none text-sm"
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="w-full flex gap-1 justify-between flex-col">
                    <label htmlFor="username">
                        <UserIcon className="h-8 w-8 text-brandBlue" />
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChangeInputs}
                        placeholder="JohnDurant"
                        className="text-zinc-600 bg-transparent border-b border-brandBlue w-full rounded-md p-2 outline-none text-sm"
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="relative w-full flex gap-1 justify-between flex-col">
                    <label htmlFor="password">
                        <LockClosedIcon className="h-8 w-8 text-brandBlue" />
                    </label>
                    <input
                        type={!isPasswordVisible ? 'password' : 'text'}
                        name="password"
                        onChange={handleChangeInputs}
                        id="password"
                        placeholder="Secret!"
                        className="text-zinc-600 bg-transparent border-b border-brandBlue  w-full rounded-md p-2 outline-none text-sm"
                        autoComplete="off"
                        required
                    />
                    {isPasswordVisible ? (
                        <EyeIcon
                            className="h-8 w-8 text-brandBlue absolute right-0 top-1/2 cursor-pointer"
                            onClick={() => setIsPasswordVisible((prev) => !prev)}
                        />
                    ) : (
                        <EyeSlashIcon
                            className="h-8 w-8 text-brandBlue absolute right-0 top-1/2 cursor-pointer"
                            onClick={() => setIsPasswordVisible((prev) => !prev)}
                        />
                    )}
                </div>

                <div className="flex gap-2">
                    <button className="flex group transition hover:border-brandBlue items-center justify-center rounded-full p-2 border border-zinc-500 hover:-translate-y-2">
                        <FontAwesomeIcon
                            icon={faGoogle}
                            className="w-5 h-5 text-zinc-600 group-hover:text-brandBlue transition group-hover:translate-y-[-2px]"
                        />
                    </button>
                    <button className="flex group transition hover:border-brandBlue items-center justify-center rounded-full p-2 border border-zinc-500 hover:-translate-y-2">
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="w-5 h-5 text-zinc-600 group-hover:text-brandBlue transition group-hover:translate-y-[-2px]"
                        />
                    </button>
                    <button className="flex group transition hover:border-brandBlue items-center justify-center rounded-full p-2 border border-zinc-500 hover:-translate-y-2">
                        <FontAwesomeIcon
                            icon={faApple}
                            className="w-5 h-5 text-zinc-600 group-hover:text-brandBlue transition group-hover:translate-y-[-2px]"
                        />
                    </button>
                </div>

                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <button
                        type="submit"
                        className="w-full py-2 transition bg-brandBlue font-medium text-white rounded-md uppercase hover:tracking-widest disabled:bg-blue-700"
                        disabled={isFormSubmitting}
                    >
                        {isFormSubmitting ? 'Saving...' : 'Sign Up'}
                    </button>
                    <span className="text-zinc-600 font-medium text-xs">
                        Have a account?
                        <Link
                            href="/signin"
                            className="uppercase hover:font-bold font-semibold underline text-brandBlue ms-1"
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
