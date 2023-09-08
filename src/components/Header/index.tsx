import Logo from "../Logo";
import dynamic from "next/dynamic";

interface HeaderProps {
  isAdm: boolean;
}

const Header = ({ isAdm }: HeaderProps) => {
  const Navbar = !isAdm ? dynamic(() => import("./Navbar")) : dynamic(() => import("./NavbarAdm"));

  return (
    <header className="flex items-center p-2">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
