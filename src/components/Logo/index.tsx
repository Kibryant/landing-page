import { PuzzlePieceIcon } from "@heroicons/react/24/outline";

type LogoProps = {
  isNavbar?: boolean;
};

const Logo = ({ isNavbar = true }: LogoProps) => {
  return (
    <div className="flex justify-between items-center space-x-2">
      <PuzzlePieceIcon
        className={`text-brandPink ${isNavbar ? "w-6 h-6" : "w-10 h-10"}`}
      />
      <h1 className={`text-zinc-300 ${isNavbar ? " text-xl" : "text-2xl"}`}>
        Arthur's
      </h1>
    </div>
  );
};

export default Logo;
