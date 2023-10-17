import Image from 'next/image'
import Footer from '../Footer'
import Header from '../Header'
import { Section } from '../Section'

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

            <main>
                <Section>
                    <div className="mx-auto sm:text-center max-w-2xl">
                        <h2 className="font-bold sm:text-center text-left text-4xl">
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
            </main>
            <Footer />
        </>
    )
}

export { Home }
