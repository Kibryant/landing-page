interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props} className="w-full rounded-md  uppercase py-2 px-4 font-medium duration-500">
            {children}
        </button>
    )
}

export default Button
