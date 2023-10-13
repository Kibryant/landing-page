import { Section } from '@/components/Section'
import Widgets from '@/components/Widgets'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'

export const metadata: Metadata = {
    title: 'CLIENT',
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header showContent={false} isAdm={false} />
            <main>
                <Section>
                    <div className="w-full flex justify-center">
                        <Widgets.Template>
                            <div className="col-span-2 z-10 pe-8">
                                <Widgets.Title>
                                    Hello, <span className="text-primary">Arthur!</span>
                                </Widgets.Title>
                                <Widgets.Subtitle
                                    subtitle="
                    On the journey from data to strategy, the Cloud is your trusted guide by making your metrics easier to visualize."
                                />
                                <Widgets.Bottom>
                                    Ask your questions{' '}
                                    <Link href="/dashboard" className="underline uppercase text-primary">
                                        here
                                    </Link>
                                    .
                                </Widgets.Bottom>
                            </div>
                            <Widgets.ImageComponent imagePath="1">
                                <Image
                                    width={98}
                                    height={63}
                                    aria-hidden={true}
                                    alt="Cloud"
                                    quality={100}
                                    src="/images/float/cloud.png"
                                    className="absolute -top-12 -left-24  z-20"
                                />
                                <Image
                                    width={98}
                                    height={63}
                                    alt="Cloud"
                                    aria-hidden={true}
                                    quality={100}
                                    src="/images/float/cloud.png"
                                    className="absolute -bottom-12 -right-12 z-10"
                                />
                            </Widgets.ImageComponent>
                        </Widgets.Template>
                    </div>
                </Section>
                {children}
            </main>
        </>
    )
}
