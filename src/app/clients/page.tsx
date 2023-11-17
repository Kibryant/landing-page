import { Section } from '@/components/Section'

export default async function Client() {
    return (
        <Section>
            <div className="p-8 border rounded-xl shadow-lg dark:shadow-none">
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
        </Section>
    )
}
