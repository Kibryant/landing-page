'use client'

import { Section } from '@/components/Section'
import 'react-toastify/ReactToastify.css'
import Header from '@/components/Header'
import Link from 'next/link'
import { BoltIcon, BugAntIcon, TvIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
    const [selectedId, setSelectedId] = useState<{
        id: string
        title: string
        description: string
    } | null>(null)
    const items = [
        {
            id: '1',
            title: 'Hello World',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit, aliquam repudiandae saepe',
        },
        {
            id: '2',
            title: 'Hello World',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit, aliquam repudiandae saepe',
        },
        {
            id: '3',
            title: 'Hello World',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit, aliquam repudiandae saepe',
        },
        {
            id: '4',
            title: 'Hello World',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit, aliquam repudiandae saepe',
        },
    ]
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
                            <Button className="w-full max-w-md font-bold uppercase text-center">
                                <Link href="/accounts/sign-up">Get started</Link>
                            </Button>
                        </div>

                        <div className="-m-2 rounded-lg dark:bg-gray-200/5 dark:ring-gray-200/10 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-10 lg:rounded-xl">
                            <Image
                                alt="Dashboard Picture"
                                quality={100}
                                width={751.7}
                                height={567.68}
                                src="/images/illustrations/dashboard.png"
                                className="rounded-lg p-2 sm:p-8 md:p-10 shadow-2xl ring-1 dark:ring-gray-200/10 ring-gray-900/10"
                            />
                        </div>
                    </div>
                </Section>
                <section className="relative flex flex-col items-center justify-center space-y-20 mt-40">
                    {/* <Image
                        alt="Cloud"
                        quality={100}
                        width={751.7}
                        height={567.68}
                        src="/images/cloud.png"
                        className="-left-10 top-0 absolute"
                    /> */}
                    <div className="flex flex-col items-center gap-y-2">
                        <h1 className="text-5xl font-bold">
                            Lorem Ipsum <span className="text-primary">Dolor</span>
                        </h1>
                        <p className="text-center max-w-lg">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit, aliquam
                            repudiandae saepe
                        </p>
                    </div>
                    <div className="flex w-full flex-col-reverse gap-y-4 sm:gap-y-0 sm:flex-row max-w-7xl items-center justify-between">
                        <div className="rounded-lg ring-1 ring-inset lg:rounded-xl">
                            <Image
                                alt="Dashboard Picture"
                                quality={100}
                                width={650.68}
                                height={600.68}
                                src="/images/illustrations/dashboard-picture-2.svg"
                                className="rounded-lg p-2 sm:p-8 md:p-10 shadow-2xl ring-1 dark:ring-gray-200/10 ring-gray-900/10"
                            />
                        </div>

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
                <Section className="mt-32">
                    <div className="flex flex-col items-center gap-y-2">
                        <h1 className="text-5xl font-bold">
                            Et Nam <span className="text-primary">Similique</span>
                        </h1>
                        <p className="text-center max-w-lg">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit, aliquam
                            repudiandae saepe
                        </p>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-y-3 mt-10">
                        {items.map((item) => (
                            <motion.div
                                className={`bg-primary-foreground rounded-xl max-w-xl shadow-lg py-8 px-6 cursor-pointer`}
                                key={item.id}
                                layoutId={item.id}
                                onClick={() => setSelectedId(item)}
                            >
                                <motion.h2>{item.title}</motion.h2>
                                <motion.h5>{item.description}</motion.h5>
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedId && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.7 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="fixed inset-0 bg-black z-10"
                                />
                                <motion.div
                                    className="max-w-xl bg-primary-foreground rounded-xl p-4 relative z-20 mx-auto"
                                    layoutId={selectedId.id}
                                    initial={{ opacity: 0, scale: 0.5 }} // start from the center
                                    animate={{ opacity: 1, scale: 1 }} // end at the full size
                                    exit={{ opacity: 0, scale: 0.5 }} // exit to the center
                                    transition={{ type: 'spring', stiffness: 60 }}
                                >
                                    <motion.h2>{selectedId.title}</motion.h2>
                                    <motion.h5>{selectedId.description}</motion.h5>
                                    <motion.button
                                        className="bg-red-600 rounded-full flex justify-center items-center top-0 right-1 absolute w-5 h-5"
                                        onClick={() => setSelectedId(null)}
                                    >
                                        <XMarkIcon className="text-white" />
                                    </motion.button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </Section>
            </main>
            <Footer />
        </div>
    )
}

export default Dashboard
