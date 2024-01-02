import { Separator as SeparatorUI } from '@/components/ui/separator'

const Separator: React.FC = () => {
    return (
        <div className="w-full">
            <SeparatorUI className="" />
            <div className="flex items-center justify-center w-full space-x-4 text-sm">
                <span className="text-sm text-center py-3 border-b w-full">Blog</span>
                <SeparatorUI orientation="vertical" />
                <span className="text-sm text-center py-3  w-full">Docs</span>
                <SeparatorUI orientation="vertical" />
                <span className="text-sm text-center py-3 w-full">Source</span>
            </div>
        </div>
    )
}

export { Separator }
