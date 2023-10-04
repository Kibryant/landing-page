import { ArrowLongRightIcon, BugAntIcon } from "@heroicons/react/24/outline";
import Logo from "../Logo";
import dynamic from "next/dynamic";
import { MiniBox } from "../MiniBox";
import Link from "next/link";
import Image from "next/image";
import bgHeader from "../../../public/images/bgHeader.png"


interface HeaderProps {
  isAdm: boolean;
}

const Header = ({ isAdm }: HeaderProps) => {
  const Navbar = !isAdm ? dynamic(() => import("./Navbar")) : dynamic(() => import("./NavbarAdm"));

  return (
    <header className="flex flex-col items-center gap-6 px-2 py-4">
      <div className="flex items-start w-full">
        <Logo />
        <Navbar />
      </div>
      {!isAdm && (
        <div className="w-full items-center max-w-7xl md:flex-row flex flex-col gap-4">
          <div className="flex flex-col gap-2 px-2">
            <MiniBox text="Lorem" Icon={BugAntIcon} />
            <h1 className="text-5xl text-black font-bold">
              This is my first <span className="text-brandBlue">Portfolio</span>
            </h1>
            <p className="text-black text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit, aliquam repudiandae saepe
            </p>
            <div className="flex flex-col gap-1 w-full">
              <Link
                href="/accounts/sign-up"
                className="w-full py-2 px-1 bg-brandBlue font-bold uppercase text-white rounded-md"
              >
                Get started
              </Link>
              <Link href="/accounts/sign-in" className="text-brandBlue flex gap-1 font-bold">
                <span>Explore</span>
                <ArrowLongRightIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div>
            <Image alt="background header" width={500} height={500} src={bgHeader} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
