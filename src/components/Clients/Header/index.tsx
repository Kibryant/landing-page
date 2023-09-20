"use client";

import { ChevronLeftIcon, CommandLineIcon, StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header>
      <aside className={`h-screen ${openMenu ? "w-72" : "w-20"} p-5 duration-300 bg-brandBlue relative`}>
        <div className="flex items-center gap-2">
          <span>
            <CommandLineIcon className="text-white w-8 h-8" />
          </span>
          <h1 className={`text-white font-medium origin-left text-xl duration-300 ${!openMenu && "scale-0"}`}>
            Web Developer
          </h1>
        </div>
        <button
          className="bg-black rounded-full p-2 cursor-pointer absolute -right-3 top-9"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <ChevronLeftIcon className={`h-5 w-5 text-white duration-300 ${!openMenu && "rotate-180"}`} />
        </button>
        <nav>
          <ul className="pt-6 space-y-2">
            <li>
              <Link href="/" className="my-custom-class">
                <StarIcon className="h-5 w-5 text-white" />

                <span className={`${!openMenu && "hidden"} origin-left duration-300`}>Menu</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="my-custom-class">
                <StarIcon className="h-5 w-5 text-white" />
                <span className={`${!openMenu && "hidden"} origin-left duration-300`}>Special Area</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="my-custom-class">
                <StarIcon className="h-5 w-5 text-white" />
                <span className={`${!openMenu && "hidden"} origin-left duration-300`}>Your Tasks</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="my-custom-class">
                <StarIcon className="h-5 w-5 text-white" />

                <span className={`${!openMenu && "hidden"} origin-left duration-300`}>Products</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="my-custom-class">
                <StarIcon className="h-5 w-5 text-white" />
                <span className={`${!openMenu && "hidden"} origin-left duration-300`}>Products</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </header>
  );
};

export { Header };
