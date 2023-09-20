import { ArrowLongRightIcon, BugAntIcon } from "@heroicons/react/24/outline";
import Logo from "../Logo";
import dynamic from "next/dynamic";
import { MiniBox } from "../MiniBox";
import Link from "next/link";

interface HeaderProps {
  isAdm: boolean;
}

const Header = ({ isAdm }: HeaderProps) => {
  const Navbar = !isAdm ? dynamic(() => import("./Navbar")) : dynamic(() => import("./NavbarAdm"));

  return (
    <header className="flex flex-col gap-6 min-h-screen">
      <div className="flex items-center p-2">
        <Logo />
        <Navbar />
      </div>
      {!isAdm && (
        <div className="w-full items-start flex flex-col gap-4">
          <div className="flex flex-col gap-2 px-2">
            <MiniBox text="Lorem" Icon={BugAntIcon} />
            <h1 className="text-5xl text-white font-bold">
              This is my first <span className="text-brandPink">Portfolio</span>
            </h1>
            <p className="text-white text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit, aliquam repudiandae saepe
            </p>
            <div className="flex flex-col gap-1 w-full">
              <Link
                href="/accounts/sign-up"
                className="w-full py-2 bg-brandPink font-bold uppercase text-white rounded-md"
              >
                Get started
              </Link>
              <Link href="/accounts/sign-in" className="text-brandPink flex gap-1 font-bold">
                <span>Explore</span>
                <ArrowLongRightIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
