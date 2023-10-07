import { ReactNode } from 'react'

type TitleType = {
    children: ReactNode
}

export function Title({ children }: TitleType) {
    return (
        <div className="mb-4">
            <h2 className="font-bold text-4xl">{children}</h2>
        </div>
    )
}
