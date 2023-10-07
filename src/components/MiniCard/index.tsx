import { ElementType } from 'react'

interface MiniCardProps {
    Icon: ElementType
    topText: string
    mainText: string
}

export default function MiniCard({ Icon, mainText, topText }: MiniCardProps) {
    return (
        <div className="flex gap-4 border border-gray-200 rounded-xl p-4 shadow w-full">
            <div className="p-4 rounded-md flex items-center justify-center bg-gray-50">
                <Icon className="h-6 w-6 text-gray-600" />
            </div>
            <div className="flex flex-col items-start justify-center">
                <h4 className="text-sm text-gray-600">{topText}</h4>
                <h5 className="text-xl text-my font-bold">{mainText}</h5>
            </div>
        </div>
    )
}
