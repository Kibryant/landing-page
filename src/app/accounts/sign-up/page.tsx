import Logo from '@/components/Logo'
import { SignUpComponent } from '@/components/SignUpComponent'

const SignUp = async () => {
    return (
        <main className="w-screen h-[90vh] flex justify-center flex-col items-center gap-2">
            <div>
                <Logo isNavbar={false} />
            </div>
            <SignUpComponent />
        </main>
    )
}

export default SignUp
