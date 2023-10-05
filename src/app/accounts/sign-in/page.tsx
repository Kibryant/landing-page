import Logo from '@/components/Logo'
import { SignInComponent } from '@/components/SignInComponent'

const SignIn = async () => {
    return (
        <main className="w-screen h-screen flex justify-center flex-col items-center gap-2">
            <div>
                <Logo isNavbar={false} />
            </div>
            <SignInComponent />
        </main>
    )
}

export default SignIn
