'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Header from '@/components/Header'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    accessCode: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Invalid email address.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
})

export function SignInAdm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            accessCode: '',
        },
    })

    const router = useRouter()

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({ accessCode, email, password }) => {
        const req = await fetch('/api/auth/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessCode, email, password }),
        })

        const res = await req.json()

        if (res.status !== HttpStatusCode.OK) {
            console.error(res)
            return
        }

        router.push('/admin')
    }

    return (
        <>
            <Header />
            <main className="w-full flex flex-col justify-center h-[95vh] items-center">
                <h1 className="text-3xl">Dashboard Admin</h1>
                <p className="text-primary text-sm">Sign in to your account.</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 p-4 w-full max-w-sm border border-primary-foreground rounded-lg"
                    >
                        <FormField
                            control={form.control}
                            name="accessCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Access Code</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Secret!" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your access code.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your email.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Secret!" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your password.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">
                            Submit
                        </Button>
                    </form>
                </Form>
            </main>
        </>
    )
}
