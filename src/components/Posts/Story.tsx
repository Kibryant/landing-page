import Image from 'next/image'

interface StoryProps {
    img: string
    username: string
}

const Story = ({ img, username }: StoryProps) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Image alt="User picture" src={img} width={50} height={50} className="rounded-full object-cover border" />
            <p className="text-xs w-14 truncate text-center">{username}</p>
        </div>
    )
}

export { Story }
