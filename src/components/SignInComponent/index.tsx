'use client'
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
import { useSignIn } from './hook/useSignIn'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

const SignInComponent = () => {
    const { errors, handleSignIn, isLoading, messageFromApi, register, handleSubmit } = useSignIn()

    return (
        <>
            <Card className="w-full max-w-xl p-8">
                <CardHeader>
                    <CardTitle>Sign-in</CardTitle>
                    <CardDescription>Sign in to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(handleSignIn)}
                        className="w-full flex flex-col justify-center items-center gap-y-6 md:gap-y-8"
                    >
                        {messageFromApi.error.length > 0 && (
                            <span className="text-red-500 text-xs">{messageFromApi.error}</span>
                        )}
                        <div className="w-full flex flex-col justify-start gap-y-2 md:flex-row md:gap-x-2 md:justify-center">
                            <Label htmlFor="email">
                                <EnvelopeIcon className="h-8 w-8 text-secondary-foreground hidden md:block" />
                            </Label>
                            <Input
                                type="email"
                                {...register('email')}
                                id="email"
                                placeholder="Your email..."
                                autoComplete="off"
                                required
                            />
                        </div>
                        {!!errors.email?.message && (
                            <span className="text-red-500 text-xs">{errors.email.message}</span>
                        )}
                        <div className="w-full flex flex-col justify-start gap-y-2 md:flex-row md:gap-x-2 md:justify-center">
                            <Label htmlFor="username">
                                <UserIcon className="h-8 w-8 text-secondary-foreground hidden md:block" />
                            </Label>
                            <Input
                                type="text"
                                id="username"
                                {...register('username')}
                                placeholder="Your username..."
                                autoComplete="off"
                                required
                            />
                        </div>
                        {!!errors.username?.message && (
                            <span className="text-red-500 text-xs">{errors.username.message}</span>
                        )}
                        <div className="w-full flex flex-col justify-start gap-y-2 md:flex-row md:gap-x-2 md:justify-center">
                            <Label htmlFor="password">
                                <LockClosedIcon className="h-8 w-8 text-secondary-foreground hidden md:block" />
                            </Label>
                            <Input
                                type="password"
                                {...register('password')}
                                id="password"
                                placeholder="Your password..."
                                autoComplete="off"
                                required
                            />
                        </div>
                        {!!errors.password?.message && (
                            <span className="text-red-500 text-xs">{errors.password.message}</span>
                        )}
                        <div className="w-full flex flex-col justify-start gap-y-2 md:flex-row md:gap-x-2 md:justify-center">
                            <Label htmlFor="confirmPassword">
                                <LockClosedIcon className="h-8 w-8 text-secondary-foreground hidden md:block" />
                            </Label>
                            <Input
                                type="confirmPassword"
                                {...register('passwordConfirm')}
                                id="confirmPassword"
                                placeholder="Your confirmPassword..."
                                autoComplete="off"
                                required
                            />
                        </div>
                        {!!errors.passwordConfirm?.message && (
                            <span className="text-red-500 text-xs">{errors.passwordConfirm.message}</span>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="w-full flex flex-col justify-center items-center gap-y-3 md:gap-y-6">
                    <div className="flex gap-x-4">
                        <button className="flex group transition hover:border-primary items-center justify-center rounded-full p-2 border  hover:-translate-y-2">
                            <FontAwesomeIcon
                                icon={faGoogle}
                                className="w-5 h-5 group-hover:text-secondary-foreground transition group-hover:translate-y-[-2px]"
                            />
                        </button>
                        <button className="flex group transition hover:border-primary items-center justify-center rounded-full p-2 border  hover:-translate-y-2">
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className="w-5 h-5 group-hover:text-secondary-foreground transition group-hover:translate-y-[-2px]"
                            />
                        </button>
                        <button className="flex group transition hover:border-primary items-center justify-center rounded-full p-2 border  hover:-translate-y-2">
                            <FontAwesomeIcon
                                icon={faApple}
                                className="w-5 h-5 group-hover:text-secondary-foreground transition group-hover:translate-y-[-2px]"
                            />
                        </button>
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <Button
                            type="submit"
                            variant="secondary"
                            className="w-full text-secondary-foreground-foreground shadow-md hover:shadow-lg transition hover:bg-secondary-foreground-foreground hover:text-secondary-foreground-foreground dark:hover:bg-secondary-foreground-foreground dark:hover:text-secondary-foreground-foreground"
                            disabled={isLoading}
                        >
                            Sign-in
                        </Button>
                    </div>
                    <span className="text-xs">
                        Don&apos;t have a account?{' '}
                        <Link href="/accounts/sign-up" className="uppercase font-bold">
                            Sign-Up
                        </Link>{' '}
                    </span>
                </CardFooter>
            </Card>
        </>
    )
}

export { SignInComponent }
