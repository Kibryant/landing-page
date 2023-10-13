import Logo from '@/components/Logo'
import { SignInComponent } from '@/components/SignInComponent'
import Image from 'next/image'

const SignIn = async () => {
    return (
        <main className="w-screen h-screen flex justify-center flex-col items-center gap-2 relative">
            <div className="hidden  md:block">
                <Logo isNavbar={false} />
            </div>
            <Image width={234} height={234} quality={100} src={`/images/illustrations/1.png`} alt="Ilustração" />

            <SignInComponent />
        </main>
    )
}

export default SignIn
