'use client'

import React, { useState } from 'react'
import { createAccount } from '@/action'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Section } from '../Section'

const NewAccountCreator: React.FC = () => {
    const [editMode, setEditMode] = useState(false)

    if (!editMode)
        return (
            <Section className="flex flex-col gap-2 items-center justify-center">
                <h1 className="font-light text-5xl">Create a New Account</h1>
                <button
                    className="text-center max-w-sm text-primary-foreground w-full bg-primary px-2 py-4 rounded-md"
                    onClick={() => setEditMode(true)}
                >
                    + New Account
                </button>
            </Section>
        )
    return (
        <Section className="flex justify-center items-center">
            <form
                action={createAccount}
                onSubmit={() => setEditMode(false)}
                className="flex w-full max-w-lg border border-primary px-10 py-8 rounded-lg flex-wrap gap-1"
            >
                <Input type="text" name="name" placeholder="Account Name" className="text-slate-900 mb-4" />
                <Button type="submit">Create</Button>
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
            </form>
        </Section>
    )
}

export { NewAccountCreator }
