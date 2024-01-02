import { Section } from '@/components/Section'

export default async function Client() {
    return (
        <Section className="grid sm:grid-cols-2 grid-rows-3">
            <div className="p-8 border max-w-xl rounded-xl shadow-lg dark:shadow-none">
                <h1 className="text-4xl font-bold text-primary mb-4">Welcome, Valued Client!</h1>
                <p className="text-lg">
                    We are thrilled to have you as our client. Thank you for choosing our services.
                </p>
                <p className="text-lg mt-3">
                    If you have any questions or need assistance, please don&apos;t hesitate to reach out.
                </p>
                <p className="text-lg mt-3">
                    We&apos;re here to serve you and make your experience with us exceptional.
                </p>
            </div>

            <div className="p-8 relative border max-w-xl rounded-xl shadow-lg dark:shadow-none mt-8 overflow-hidden">
                <h1 className="text-4xl font-bold text-primary mb-4">What&apos;s Next?</h1>
                <p className="text-lg">
                    We&apos;re working hard to get your account set up. We&apos;ll notify you when it&apos;s ready.
                </p>
                <p className="text-lg mt-3">
                    In the meantime, you can check out our <a href="/docs">documentation</a> to learn more about our
                    services.
                </p>
                <div className="bg-primary w-20 h-20 rounded-full absolute -right-9 bottom-[0.05px]"></div>
            </div>
        </Section>
    )
}
