import { ChangeEventHandler } from "react";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  type: "text" | "number";
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}
const Input = ({
  value,
  onChange,
  type,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <input
      {...props}
      type={type}
      value={value}
      onChange={onChange}
      className="p-2 border border-brandPink outline-none w-full text-white placeholder:text-zinc-300 rounded-md bg-transparent"
      placeholder={placeholder}
    />
  );
};

export { Input };
