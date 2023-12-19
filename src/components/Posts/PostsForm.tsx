'use client'

import { useState } from 'react'
import { storage, db } from '@/external/database/connections/firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import * as Progress from '@radix-ui/react-progress'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { collection, addDoc } from 'firebase/firestore'
import { getUserLocalStorage } from '@/utils'

const PostsForm = () => {
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState<File | null>(null)

    const user = getUserLocalStorage()
    const authorId = user?._id ?? ''

    const schema = z.object({
        title: z.string().min(2, {
            message: 'Title must be at least 2 characters.',
        }),
        content: z.string().min(2, {
            message: 'Content must be at least 2 characters.',
        }),
    })

    type Schema = z.infer<typeof schema>

    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            content: '',
        },
    })

    const handleSubmit: SubmitHandler<Schema> = async ({ title, content }) => {
        try {
            if (!image) {
                alert('Please select a image')
                return
            }

            const fileRef = ref(storage, `newfiles/posts/${image?.name}`)
            const uploadTask = uploadBytesResumable(fileRef, image)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setProgress(progress)
                },
                (error) => {
                    console.error('Error uploading file: ', error)
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref)
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const docRef = await addDoc(collection(db, 'posts'), {
                        title,
                        content,
                        url,
                        authorId,
                    })

                    setProgress(0)
                },
            )
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }
    return (
        <>
            <Card className="w-full max-w-xl">
                <CardHeader className="">
                    <CardTitle>Create Post</CardTitle>
                    <CardDescription>Enter title, description and content</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form className="flex flex-col gap-y-2 p-4" onSubmit={form.handleSubmit(handleSubmit)}>
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

                        <Button disabled={!!form.formState.isLoading} variant="outline" type="submit">
                            Send
                        </Button>
                    </form>
                </Form>
            </Card>
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
                        <Input
                            type="file"
                            id="file"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export { PostsForm }
