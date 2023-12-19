import Navbar from '@/components/Header/Navbar'
import Logo from '@/components/Logo'

const Header = () => {
    return (
        <header className="flex flex-col items-center gap-6 sm:px-2 pt-4 pb-10">
            <div className="flex w-full">
                <Logo />
                <Navbar />
            </div>
        </header>
    )
}

export { Header }
