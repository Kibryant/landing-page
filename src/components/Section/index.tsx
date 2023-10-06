import { cn } from '@/utils'

type SectionProps = {
    children: React.ReactNode
    className?: string
}

const Section = ({ children, className }: SectionProps) => {
    return (
        <section className={cn('w-full px-2 mt-10 flex justify-center items-center', className)}>
            <div className="w-full max-w-7xl">{children}</div>
        </section>
    )
}

export { Section }
