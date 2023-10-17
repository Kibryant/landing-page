'use client'

import { Section } from '@/components/Section'
import 'react-toastify/ReactToastify.css'
import Header from '@/components/Header'
import Link from 'next/link'
import { BoltIcon, BugAntIcon, TvIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Footer from '@/components/Footer'

const Dashboard = () => {
    return (
        <div className="overflow-x-hidden px-2">
            <Header showContent={false} isAdm={false} />
            <main>
                <Section>
                    <div className="flex flex-col items-center justify-center gap-y-16 w-full">
                        <div className="flex flex-col items-center gap-y-2">
                            <h1 className="text-5xl font-bold">
                                Codext My First <span className="text-primary">LP</span>
                            </h1>
                            <p className="text-center max-w-lg">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit, aliquam
                                repudiandae saepe
                            </p>
                            <Link
                                href="/accounts/sign-up"
                                className="w-full py-2 px-3 text-white max-w-md bg-primary font-bold uppercase text-center rounded-xl"
                            >
                                Get started
                            </Link>
                        </div>

                        <div className="-m-2 rounded-lg dark:bg-gray-200/5 dark:ring-gray-200/10 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-10 lg:rounded-xl lg:p-4">
                            <Image
                                alt="Dashboard Picture"
                                quality={100}
                                width={751.7}
                                height={567.68}
                                src="/images/dashboard-picture.png"
                                className="rounded-lg p-2 sm:p-8 md:p-20 shadow-2xl ring-1 dark:ring-gray-200/10 ring-gray-900/10"
                            />
                        </div>
                    </div>
                </Section>
                <section className="relative flex items-center justify-center">
                    <Image
                        alt="Cloud"
                        quality={100}
                        width={751.7}
                        height={567.68}
                        src="/images/cloud.png"
                        className="-left-10 top-0 absolute"
                    />
                    <div className="flex w-full flex-col-reverse gap-y-4 sm:gap-y-0 sm:flex-row max-w-7xl items-center justify-between mt-40">
                        <Image
                            alt="Dashboard Picture"
                            quality={100}
                            width={650.68}
                            height={600.68}
                            src="/images/dashboard-picture.png"
                            className="z-50"
                        />
                        <div className="flex flex-col gap-y-6 z-50">
                            <h2 className="text-3xl text-left">I&apos;ts a Very Beautiful System</h2>
                            <div className="flex gap-4 border rounded-xl p-4 shadow w-full ">
                                <div className="p-4 rounded-md flex items-center justify-center bg-gray-50">
                                    <BugAntIcon className="h-8 w-8 text-[#4C9BE8]" />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <h4 className="text-sm">Hello World</h4>
                                    <h5 className="text-xl text-[#4C9BE8] font-bold">Easy</h5>
                                </div>
                            </div>
                            <div className="flex gap-4 border rounded-xl p-4 shadow w-full">
                                <div className="p-4 rounded-md flex items-center justify-center bg-gray-50">
                                    <TvIcon className="h-8 w-8 text-[#7C1DC9]" />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <h4 className="text-sm">Hello World</h4>
                                    <h5 className="text-xl text-[#7C1DC9] font-bold">Easy</h5>
                                </div>
                            </div>
                            <div className="flex gap-4 border rounded-xl p-4 shadow w-full">
                                <div className="p-4 rounded-md flex items-center justify-center bg-gray-50">
                                    <BoltIcon className="h-8 w-8 text-[#4B61B8]" />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <h4 className="text-sm">Hello World</h4>
                                    <h5 className="text-xl text-[#4B61B8] font-bold">Easy</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Dashboard
