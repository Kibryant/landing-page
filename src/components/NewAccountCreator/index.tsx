'use client'

import React, { useState } from 'react'
// import { createAccount } from '@/actions'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const NewAccountCreator: React.FC = () => {
    const [editMode, setEditMode] = useState(false)

    if (!editMode)
        return (
            <button
                className="text-center text-primary-foreground w-full bg-primary px-2 py-4 rounded-md"
                onClick={() => setEditMode(true)}
            >
                + New Account
            </button>
        )
    // action={createAccount}
    return (
        <form onSubmit={() => setEditMode(false)} className="flex flex-wrap gap-1">
            <Input type="text" name="name" placeholder="Account Name" className="text-slate-900" />
            <Button type="submit">Create</Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
        </form>
    )
}

export default NewAccountCreator
