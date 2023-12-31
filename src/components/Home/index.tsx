import Image from 'next/image'
import Footer from '../Footer'
import Header from '../Header'
import { Section } from '../Section'
import MiniCard from '../MiniCard'
import { AppleIcon, CodeIcon, HeartIcon, RatIcon } from 'lucide-react'
import FAQ from '../FAQ'

const Home = async () => {
    return (
        <>
            {/* <div>
                <div className="relative isolate">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 -top-40 z-50 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5]  to-[#9089fc] opacity-30 sm:left-[calc(50% - 30rem)] sm:w-[72.125rem]"
                        />
                    </div>
                </div>
            </div> */}

            <Header showContent={true} isAdm={false} />

            <main className="relative">
                <Section>
                    <div className="mx-auto sm:text-center max-w-2xl">
                        <h2 className="font-extrabold sm:text-center text-left text-4xl">
                            Hello My Name is <span className="text-primary">Arthur!</span>
                        </h2>
                        <p className="mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    </div>
                    <ol className="my-8 space-y-4 mt-8 md:flex md:space-x-12 md:space-y-0">
                        <li className="md:flex-1 ">
                            <div className="flex flex-col space-y-2 border-l-4 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                                <span className="text-sm font-medium text-primary">Step 1</span>
                                <span className="text-xl font-semibold">Sign Up for account</span>
                                <span className="mt-2">
                                    Either Starting Out With a Free plan or choose our pro plan!
                                </span>
                            </div>
                        </li>
                        <li className="md:flex-1 ">
                            <div className="flex flex-col space-y-2 border-l-4 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                                <span className="text-sm font-medium text-primary">Step 2</span>
                                <span className="text-xl font-semibold">Buy our Products!</span>
                                <span className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                            </div>
                        </li>
                        <li className="md:flex-1 ">
                            <div className="flex flex-col space-y-2 border-l-4 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                                <span className="text-sm font-medium text-primary">Step 3</span>
                                <span className="text-xl font-semibold">Start Making Money</span>
                                <span className="mt-2">
                                    Either Starting Out With a Free plan or choose our pro plan!
                                </span>
                            </div>
                        </li>
                        <li className="md:flex-1 ">
                            <div className="flex flex-col space-y-2 border-l-4 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                                <span className="text-sm font-medium text-primary">Step 4</span>
                                <span className="text-xl font-semibold">Hello World</span>
                                <span className="mt-2">
                                    Either Starting Out With a Free plan or choose our pro plan!
                                </span>
                            </div>
                        </li>
                    </ol>
                    <div className="-m-2 rounded-lg bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounde-xl lg:p-4">
                        <Image
                            alt="alt"
                            quality={100}
                            width={1280}
                            height={866}
                            src="/images/file-upload-preview.jpg"
                            className="bg-white rounded-lg p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                        />
                    </div>
                </Section>
                <Section>
                    <div className="mx-auto sm:text-center max-w-2xl">
                        <h2 className="font-extrabold sm:text-center text-left text-4xl">
                            Hello <span className="text-primary">World!</span>
                        </h2>
                        <p className="mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    </div>

                    <Image
                        alt="Cloud"
                        quality={100}
                        width={300}
                        height={300}
                        src="/images/cloud.png"
                        className="-left-24 top-[600px] absolute z-[-999] dark:hidden"
                    />

                    <div className="sm:flex-row flex flex-col justify-center z-50 items-center">
                        <Image
                            alt="Illustration"
                            src="/images/illustrations/1.png"
                            quality={100}
                            width={800}
                            height={800}
                            className="rounded-lg p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                        />
                        <div className="w-full flex flex-col gap-y-5">
                            <MiniCard Icon={HeartIcon} mainText="Lorem ipsur dolor" topText="Hello, World" />
                            <MiniCard Icon={RatIcon} mainText="Lorem ipsur dolor" topText="Hello, World" />
                            <MiniCard Icon={CodeIcon} mainText="Lorem ipsur dolor" topText="Hello, World" />
                            <MiniCard Icon={AppleIcon} mainText="Lorem ipsur dolor" topText="Hello, World" />
                        </div>
                    </div>

                    <Image
                        alt="Cloud"
                        quality={100}
                        width={300}
                        height={300}
                        src="/images/cloud.png"
                        className="-right-24 rotate-180 top-[1000px] absolute z-[-999] dark:hidden"
                    />
                </Section>
                <Section>
                    <div className="mx-auto sm:text-center max-w-2xl">
                        <h2 className="font-extrabold sm:text-center text-left text-4xl">
                            Hello <span className="text-primary">World!</span>
                        </h2>
                        <p className="mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="relative rounded-lg bg-secondary/30 p-2">
                        <div className="relative flex text-center">
                            <div className="flex pl-3.5 pt-3">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-ml-0.5 mr-1.5 h-3 w-3 text-red-500/20"
                                >
                                    <circle r="12" cy="12" cx="12"></circle>
                                </svg>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500/20"
                                >
                                    <circle r="12" cy="12" cx="12"></circle>
                                </svg>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-ml-0.75 mr-1.5 h-3 w-3 text-green-500/20"
                                >
                                    <circle r="12" cy="12" cx="12"></circle>
                                </svg>
                            </div>
                            <span className="absolute inset-x-0 top-2 text-xs text-slate-500">ProgressBar.tsx</span>
                        </div>
                        <div className="mt-5 space-y-1.5 px-5 pb-10">
                            <p className="mt-4 font-mono text-xs font-normal tracking-wide text-violet-400">
                                <span className="text-slate-500">&lt;</span>
                                <span className="text-pink-400">Card</span>
                                <span className="text-slate-500">&gt;</span>
                            </p>
                            <p className="ml-3 font-mono text-xs font-normal tracking-wide text-violet-400">
                                <span className="text-slate-500">&lt;</span>
                                <span className="text-pink-400">Text</span>
                                <span className="text-slate-500">&gt;</span>
                                <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                                    <span className="relative text-blue-400">Ticket Sales</span>
                                </span>
                                <span className="text-slate-500">&lt;/</span>
                                <span className="text-pink-400">Text</span>
                                <span className="text-slate-500">&gt;</span>
                            </p>
                            <p className="ml-3 font-mono text-xs font-normal leading-4 tracking-wide text-violet-400">
                                <span className="text-slate-500">&lt;</span>
                                <span className="text-pink-400">Metric</span>
                                <span className="text-slate-500">&gt;</span>
                                <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                                    <span className="relative text-blue-400">$ 71,465</span>
                                </span>
                                <span className="text-slate-500">&lt;/</span>
                                <span className="text-pink-400">Metric</span>
                                <span className="text-slate-500">&gt;</span>
                            </p>
                            <p className="ml-3 font-mono text-xs font-normal tracking-wide text-violet-400">
                                <span className="text-slate-500">&lt;</span>
                                <span className="text-pink-400">Flex</span>
                                <span className="ml-2 text-violet-400">
                                    className<span className="text-slate-500">=</span>
                                    <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                                        <span className="relative text-blue-400">&ldquo;mt-3&rdquo;</span>
                                    </span>
                                </span>
                                <span className="text-slate-500">&gt;</span>
                            </p>
                            <p className="ml-6 font-mono text-xs font-normal tracking-wide text-violet-400">
                                <span className="text-slate-500">&lt;</span>
                                <span className="text-pink-400">Text</span>
                                <span className="text-slate-500">&gt;</span>
                                <span className="text-slate-500">&lt;</span>
                                <span className="text-pink-400">Bold</span>
                                <span className="text-slate-500">&gt;</span>
                                <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                                    <span className="relative text-blue-400">32%</span>
                                </span>
                                <span className="text-slate-500">&lt;/</span>
                                <span className="text-pink-400">Bold</span>
                                <span className="text-slate-500">&gt;</span>
                                <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                                    <span className="relative text-blue-400">of annual target</span>
                                </span>
                                <span className="text-slate-500">&lt;/</span>
                                <span className="text-pink-400">Text</span>
                                <span className="text-slate-500">&gt;</span>
                            </p>
                            <p className="ml-6 font-mono text-xs font-normal tracking-wide text-violet-400">
                                <span className="text-slate-500">&lt;</span>
                                <span className="text-pink-400">Text</span>
                                <span className="text-slate-500">&gt;</span>
                                <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                                    <span className="relative text-blue-400">$ 223,328</span>
                                </span>
                                <span className="text-slate-500">&lt;/</span>
                                <span className="text-pink-400">Text</span>
                                <span className="text-slate-500">&gt;</span>
                            </p>
                            <p className="ml-3 font-mono text-xs font-normal tracking-wide text-violet-400">
                                <span className="text-slate-500">&lt;/</span>
                                <span className="text-pink-400">Flex</span>
                                <span className="text-slate-500">&gt;</span>
                            </p>
                            <p className="ml-3 font-mono text-xs font-normal leading-4 tracking-wide text-violet-400">
                                <span className="text-slate-500">&lt;</span>
                                <span className="text-pink-400">ProgressBar</span>
                                <span className="ml-2 text-violet-400">
                                    value<span className="text-slate-500">=</span>
                                    <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                                        <span className="relative text-blue-400">{32}</span>
                                    </span>
                                </span>
                                <span className="ml-2 text-violet-400">
                                    className<span className="text-slate-500">=</span>
                                    <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                                        <span className="relative text-blue-400">&ldquo;mt-3&rdquo;</span>
                                    </span>
                                </span>
                                <span className="text-slate-500">/&gt;</span>
                            </p>
                            <p className="font-mono text-xs font-normal tracking-wide text-violet-400">
                                <span className="text-slate-500">&lt;/</span>
                                <span className="text-pink-400">Card</span>
                                <span className="text-slate-500">&gt;</span>
                            </p>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="mx-auto sm:text-center max-w-2xl">
                        <h2 className="font-extrabold sm:text-center text-primary text-left text-4xl">FAQ</h2>
                        <p className="mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    </div>
                    <FAQ />
                </Section>
            </main>
            <Footer />
        </>
    )
}

export { Home }
