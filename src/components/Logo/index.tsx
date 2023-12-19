import { PuzzlePieceIcon } from '@heroicons/react/24/outline'

type LogoProps = {
    isNavbar?: boolean
}

const Logo = ({ isNavbar = true }: LogoProps) => {
    return (
        <div className="flex justify-between items-center space-x-2">
            <PuzzlePieceIcon className={`text-primary ${isNavbar ? 'w-6 h-6' : 'w-10 h-10'}`} />
            <h1 className={`font-semibold ${isNavbar ? ' text-xl' : 'text-2xl'}`}>Arthur&apos;s</h1>
        </div>
    )
}

export default Logo
