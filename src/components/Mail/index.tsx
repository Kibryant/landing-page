import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components'

interface MailProps {
    userEmail: string
}

const Mail = ({ userEmail }: MailProps) => {
    const previewText = `Faça login na Pizza Shop`

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px] text-center">
                            <span className="text-[#666666] text-[12px] leading-[24px]">
                                <Link href="/" className="text-sky-500 no-underline">
                                    Landing Page
                                </Link>
                            </span>
                        </Section>
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Make your login
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Hello, <strong>{userEmail}</strong>
                        </Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-sky-500 rounded text-white px-5 py-3 text-[12px] font-semibold no-underline text-center"
                                href="/"
                            >
                                Login
                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            If you have trouble clicking the button, copy and paste the URL below into your web
                            <Link href="/" className="text-sky-500 no-underline">
                                browser
                            </Link>
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            You received this email because you are registered with Pizza Shop
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export { Mail }
