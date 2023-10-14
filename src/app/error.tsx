'use client'

import Link from 'next/link'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base text-primary font-bold">There was a problem!</p>
                <h1 className="mt-4 text-3xl font-bold tracking-wider">{!!error.message || 'Something went wrong!'}</h1>
                <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                    Please try again later or contact support if the problem persists!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button onClick={reset} className="text-primary py-2 px-4 bg-primary/50 font-medium rounded-md">
                        Reset
                    </button>
                    <Link href="/" className="text-white font-medium rounded-xl py-2 px-4 bg-emerald-500">
                        Back
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Error
