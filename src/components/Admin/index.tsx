import { BugAntIcon, HomeModernIcon, StarIcon, UserIcon } from "@heroicons/react/24/outline";
import MiniCard from "../MiniCard";

const Adm = () => {
  return (
    <>
      <section className="w-full flex flex-col justify-center items-center">
        <div className="max-w-6xl w-full">
          <div className="flex">
            <h1 className="text-5xl text-zinc-600">Painel Administrativo</h1>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <MiniCard
              Icon={StarIcon}
              mainText="Hello, World!"
              topText="Hi"
            />
            <MiniCard
              Icon={UserIcon}
              mainText="Dashboard Admin"
              topText="Hi"
            />
            <MiniCard
              Icon={BugAntIcon}
              mainText="Dashboard Admin"
              topText="Hi"
            />
            <MiniCard
              Icon={HomeModernIcon}
              mainText="Dashboard Admin"
              topText="Hi"
            />
          </div>
        </div>

      </section>
    </>
  );
};

export { Adm };
