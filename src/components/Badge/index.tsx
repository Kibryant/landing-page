interface BadgeProps {
    text: string
}

const Badge = ({ text }: BadgeProps) => {
    return (
        <span className="inline-block border max-w-fit text-center dark:shadow-none dark:bg-[#141727] dark:text-[#9CAFFC] dark:border-[#3C53A1] text-xs px-2 rounded-md uppercase font-semibold tracking-wide shadow-md">
            {text}
        </span>
    )
}

export { Badge }
