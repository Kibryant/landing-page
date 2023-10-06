'use client'

import { Input } from '@/components/Input'
import { Section } from '@/components/Section'
import { useFetch } from '@/functions/useFetch'
import { ChangeEvent, useState, useCallback } from 'react'
// import { ToastContainer, toast } from 'react-toastify'
import { Toaster, toast } from 'sonner'
import 'react-toastify/ReactToastify.css'
import Header from '@/components/Header'
import Link from 'next/link'
import { ArrowLongRightIcon, BoltIcon, BugAntIcon, TvIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface PeopleNameProps {
    title: string
    first: string
    last: string
}

interface PeopleLocationProps {
    street: {
        number: number
        name: string
    }
    city: string
    state: string
    country: string
    postcode: string
}
interface PeopleProps {
    gender: string
    name: PeopleNameProps
    location: PeopleLocationProps
}
interface Data {
    results: PeopleProps[]
}

const Dashboard = () => {
    const [goal, setGoal] = useState('')
    const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setGoal(e.target.value)
    }, [])

    const notify = () => toast.success('Hello world')
    return (
        <>
            <Header showContent={false} />
            <main>
                <Section>
                    <div className="flex flex-col items-center justify-center gap-y-16 w-full">
                        <div className="flex flex-col items-center gap-y-2">
                            <h1 className="text-5xl font-bold">
                                Codext My First <span className="text-brandBlue">LP</span>
                            </h1>
                            <p className="text-zinc-700 text-center max-w-lg">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nam similique odit, aliquam
                                repudiandae saepe
                            </p>
                            <Link
                                href="/accounts/sign-up"
                                className="w-full py-2 px-3 max-w-md bg-brandBlue font-bold uppercase text-center text-white rounded-md"
                            >
                                Get started
                            </Link>
                        </div>

                        <div className="-m-2 rounded-lg bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-10 lg:rounde-xl lg:p-4">
                            <Image
                                alt="Dashboard Picture"
                                quality={100}
                                width={751.7}
                                height={567.68}
                                src="/images/dashboard-picture.png"
                                className="rounded-lg p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                            />
                        </div>
                    </div>
                </Section>
                <Section className="relative">
                    <Image
                        alt="Dashboard Picture"
                        quality={100}
                        width={751.7}
                        height={567.68}
                        src="/images/cloud.png"
                        className="-left-10 top-0 absolute"
                    />
                    <div className="flex justify-between mt-40">
                        <Image
                            alt="Dashboard Picture"
                            quality={100}
                            width={650.68}
                            height={600.68}
                            src="/images/dashboard-picture.png"
                            className="z-50"
                        />
                        <div className="flex flex-col gap-y-6">
                            <h2 className="text-3xl">I&apos;ts a Very Beautiful System</h2>
                            <div className="flex gap-4 border border-gray-200 rounded-xl p-4 shadow w-full">
                                <div className="p-4 rounded-md flex items-center justify-center bg-gray-50">
                                    <BugAntIcon className="h-8 w-8 text-[#4C9BE8]" />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <h4 className="text-sm text-gray-600">Hello World</h4>
                                    <h5 className="text-xl text-[#4C9BE8] font-bold">Easy</h5>
                                </div>
                            </div>
                            <div className="flex gap-4 border border-gray-200 rounded-xl p-4 shadow w-full">
                                <div className="p-4 rounded-md flex items-center justify-center bg-gray-50">
                                    <TvIcon className="h-8 w-8 text-[#7C1DC9]" />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <h4 className="text-sm text-gray-600">Hello World</h4>
                                    <h5 className="text-xl text-[#7C1DC9] font-bold">Easy</h5>
                                </div>
                            </div>
                            <div className="flex gap-4 border border-gray-200 rounded-xl p-4 shadow w-full">
                                <div className="p-4 rounded-md flex items-center justify-center bg-gray-50">
                                    <BoltIcon className="h-8 w-8 text-[#4B61B8]" />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <h4 className="text-sm text-gray-600">Hello World</h4>
                                    <h5 className="text-xl text-[#4B61B8] font-bold">Easy</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </main>
        </>
    )
}

export default Dashboard
