import { BugAntIcon, HomeModernIcon, StarIcon, UserIcon } from '@heroicons/react/24/outline'
import MiniCard from '../MiniCard'
import { Section } from '../Section'

const Admin = () => {
    return (
        <>
            <Section className="space-y-4">
                <div className="flex">
                    <h1 className="text-5xl font-bold">
                        Dashboard <span className="text-primary">Admin</span>
                    </h1>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <MiniCard Icon={StarIcon} mainText="Hello, Arthur!" topText="Update" />
                    <MiniCard Icon={UserIcon} mainText="Dashboard Admin" topText="Delete" />
                    <MiniCard Icon={BugAntIcon} mainText="Stats Admin" topText="Save" />
                    <MiniCard Icon={HomeModernIcon} mainText="Beautiful" topText="Change" />
                </div>
            </Section>
        </>
    )
}

export { Admin }
