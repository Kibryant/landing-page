import { ElementType } from "react";

interface MiniBoxProps {
  Icon: ElementType;
  text: string;
}

const MiniBox = ({ Icon, text }: MiniBoxProps) => {
  return (
    <div className="px-2 py-1 flex rounded-md bg-brandBlue  max-w-[100px] justify-center items-center gap-1">
      <Icon className="w-5 h-5 text-white" />
      <span className="font-medium uppercase tracking-widest text-xs text-white">{text}</span>
    </div>
  );
};

export { MiniBox };
