import { StarIcon } from "@heroicons/react/24/outline";
import Logo from "../Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full p-2 bg-brandBlue">
      <div className="flex flex-col gap-6 w-full max-w-7xl">
        <div className="grid place-items-center grid-cols-4 w-full">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-white">Arthur's</h2>
            <p className="text-justify text-xs text-zinc-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis provident eum at architecto natus?
              Eveniet corrupti voluptas laboriosam laudantium, blanditiis cumque fugit deserunt tenetur culpa accusamus,
            </p>
            <div className="flex gap-1">
              <div className="p-3 shadow-lg rounded-full">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="p-3 shadow-lg rounded-full">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="p-3 shadow-lg rounded-full">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="p-3 shadow-lg rounded-full">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <h3 className="text-white font-semi-bold">Resources</h3>
            <div className="flex flex-col gap-2 ">
              <Link href="" className="text-sm text-zinc-200">
                Home
              </Link>
              <Link href="" className="text-sm text-zinc-200">
                Products
              </Link>
              <Link href="" className="text-sm text-zinc-200">
                SignIn
              </Link>
              <Link href="" className="text-sm text-zinc-200">
                Oie
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <h3 className="text-white font-semi-bold">Useful Links</h3>
            <div className="flex flex-col gap-2 ">
              <Link href="" className="text-sm text-zinc-200">
                Home
              </Link>
              <Link href="" className="text-sm text-zinc-200">
                Products
              </Link>
              <Link href="" className="text-sm text-zinc-200">
                SignIn
              </Link>
              <Link href="" className="text-sm text-zinc-200">
                Oie
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-white">News Letter</h2>
            <p className="text-justify text-xs text-zinc-200">Sign-Up with you email!</p>
            <div className="relative">
              <input className="w-full rounded-sm border p-2 bg-transparent outline-none text-white" type="text" />
              <button className="bg-white absolute rounded-tr-sm rounded-br-sm p-2 right-[-1px] text-center">
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="border-t py-2">
          <p className="text-center  text-white text-xs font-medium">Copyright 2021 Arthur's All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
