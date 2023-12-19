'use client'

import React, { useState } from 'react'
import { createAccount } from '@/action'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Section } from '../Section'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Card } from '../ui/card'

const NewAccountCreator: React.FC = () => {
    const [editMode, setEditMode] = useState(false)

    if (!editMode)
        return (
            <Section className="flex flex-col gap-2 items-center justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Create a new account</CardTitle>
                        <CardDescription> Create a new account to start tracking your expenses.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="default"
                            className="w-full text-secondary-foreground"
                            onClick={() => setEditMode(true)}
                        >
                            New Account
                        </Button>
                    </CardContent>
                    <CardFooter>
                        <p className="text-center text-muted-foreground">
                            You can create as many accounts as you want.
                        </p>
                    </CardFooter>
                </Card>
            </Section>
        )

    return (
        <Section className="flex justify-center items-center">
            <form action={createAccount} onSubmit={() => setEditMode(false)} className="flex flex-col gap-y-4">
                <Input type="text" name="name" placeholder="Account Name" />
                <div className="flex justify-between gap-x-2">
                    <Button variant="outline" className="flex-1" type="submit">
                        Create
                    </Button>
                    <Button variant="destructive" onClick={() => setEditMode(false)}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Section>
    )
}

export { NewAccountCreator }
