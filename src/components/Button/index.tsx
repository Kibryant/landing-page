interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="w-full rounded-md bg-brandCyan-400 uppercase text-black py-2 px-4 font-medium hover:bg-brandCyan-600 duration-500"
    >
      {children}
    </button>
  );
};

export default Button;
