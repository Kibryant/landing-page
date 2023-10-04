import Link from "next/link";

const Notfound = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-bold text-emerald-700 dark:text-emerald-500">There was a problem!</p>
        <h1 className="mt-4 text-3xl font-bold tracking-wider text-zinc-900 dark:text-white">
          404 Error - Page Not Found!
        </h1>
        <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-300">
          Please try again later or contact support if the problem persists!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className="text-white font-medium px-4 py-2 rounded-md bg-emerald-500">
            Back
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Notfound;
