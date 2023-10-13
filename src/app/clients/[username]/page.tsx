'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'

type ClientProps = {
    params: {
        username: string
    }
}

const Client = ({ params }: ClientProps) => {
    const { data, status } = useSession()

    return (
        <div>
            <h1 className="text-white text-xl">Oie!!!! {params.username}</h1>
            <h1 className="text-white text-xl">Oie!!!! {data?.user?.email}</h1>
        </div>
    )
}

export default Client
