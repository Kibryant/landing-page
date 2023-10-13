interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    isLoading?: boolean
}

const Button = ({ children, isLoading }: ButtonProps) => {
    return (
        <button className="w-full rounded-md  uppercase py-2 px-4 font-medium duration-500">
            {isLoading ? 'Loading...' : children}
        </button>
    )
}

export default Button
