import { ElementType } from 'react'

interface MiniBoxProps {
    Icon: ElementType
    text: string
}

const MiniBox = ({ Icon, text }: MiniBoxProps) => {
    return (
        <div className="px-4 py-2 flex rounded-xl bg-brandBlue max-w-[140px] justify-center items-center gap-x-2">
            <Icon className="w-5 h-5 text-white" />
            <span className="font-normal uppercase tracking-widest text-xs text-white">{text}</span>
        </div>
    )
}

export { MiniBox }
