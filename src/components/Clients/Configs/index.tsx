import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useUpdateUser } from './hook/useUpdateUser'

const Configs = () => {
    const { handleSubmit, handleSubmitUpdateUser, register, errors, isLoading, messageFromApi } = useUpdateUser()

    return (
        <div className="w-full flex flex-col gap-10 justify-center items-center mt-10 ">
            <form className="w-full max-w-2xl" onSubmit={handleSubmit(handleSubmitUpdateUser)}>
                <Tabs defaultValue="account">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription className="flex flex-col">
                                    Make changes to your account here. Click save when you&apos;re done.
                                    {!!messageFromApi.error && (
                                        <span className="text-destructive-foreground">{messageFromApi.error}</span>
                                    )}
                                    {!!messageFromApi.sucess && (
                                        <span className="text-green-500">{messageFromApi.sucess}</span>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1">
                                    <Label htmlFor="Email">Email</Label>
                                    <Input id="Email" {...register('newEmail')} />
                                    {!!errors.newEmail?.message && (
                                        <span className="text-destructive">{errors.newEmail.message}</span>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" {...register('newUsername')} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button disabled={isLoading} type="submit" className="text-secondary-foreground">
                                    Save changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you&apos;ll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>
                                    <Input id="current" type="password" {...register('currentPassword')} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>
                                    <Input id="new" type="password" {...register('newPassword')} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button disabled={isLoading} type="button" className="text-secondary-foreground">
                                    Save password
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </div>
    )
}

export { Configs }
