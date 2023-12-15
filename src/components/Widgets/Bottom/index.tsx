import { ReactNode } from 'react'

type BottomType = {
    children: ReactNode
}

export function Bottom({ children }: BottomType) {
    return (
        <div className="absolute bottom-4">
            <p className="font-medium text-sm">{children}</p>
        </div>
    )
}
