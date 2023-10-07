import { ReactNode } from 'react'

type TemplateType = {
    children: ReactNode
}

export function Template({ children }: TemplateType) {
    return (
        <div className="relative grid max-w-[679px] grid-cols-3 rounded-xl shadow-lg bg-gray-50 p-6 h-72">
            {children}
        </div>
    )
}
