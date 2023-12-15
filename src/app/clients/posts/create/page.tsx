'use client'

import { useState } from 'react'
import { storage } from '@/external/database/connections/firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import * as Progress from '@radix-ui/react-progress'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const Page = () => {
    const [file, setFile] = useState<FileList | null>(null)
    const [progress, setProgress] = useState(0)

    const schema = z.object({
        title: z.string().min(2, {
            message: 'Title must be at least 2 characters.',
        }),
        content: z.string().min(2, {
            message: 'Content must be at least 2 characters.',
        }),
        description: z.string().min(2, {
            message: 'Description must be at least 2 characters.',
        }),
    })

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            content: '',
            description: '',
        },
    })

    const upload = async () => {
        if (!file) alert('Please select a file')

        const fileRef = ref(storage, `newfiles/posts/${file?.[0].name}`)

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const uploadTask = uploadBytesResumable(fileRef, file![0])

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Calculate the progress percentage
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
            },
            (error) => {
                console.log(error)
            },
            async () => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                setFile(null)
                setProgress(0)
            },
        )
    }

    return (
        <div className="w-full h-[90vh] flex justify-around items-center">
            <div className="flex flex-col justify-star items-startt">
                <CardHeader className="">
                    <CardTitle>Create Post</CardTitle>
                    <CardDescription>Enter title, description and content</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form
                        className="w-full space-y-8 ml-6 flex flex-col items-"
                        onSubmit={form.handleSubmit((data) => console.log(data))}
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Hello, World!" {...field} />
                                    </FormControl>
                                    <FormDescription>The content of your post</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Hello, World!" {...field} />
                                    </FormControl>
                                    <FormDescription>The title of your post</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Hello, World!" {...field} />
                                    </FormControl>
                                    <FormDescription>The title of your post</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Upload File</CardTitle>
                    <CardDescription>Upload file to your post</CardDescription>
                </CardHeader>
                <CardContent className="">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="file">Image</label>
                        <Progress.Root
                            className="relative overflow-hidden bg-blackA6 rounded-full w-full h-[25px]"
                            style={{
                                transform: 'translateZ(0)',
                            }}
                            value={progress}
                        >
                            <span className="ms-2 text-center">{Math.floor(progress)}%</span>
                            <Progress.Indicator
                                className="bg-primary w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                                style={{ transform: `translateX(-${100 - progress}%)` }}
                            />
                        </Progress.Root>
                        <Input type="file" id="file" onChange={(e) => setFile(e.target.files)} />
                        <Button type="button" onClick={upload}>
                            Send
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Page
