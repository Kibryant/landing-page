import { ReactNode } from 'react'
import Image from 'next/image'

type ImageType = {
    imagePath: string
    children: ReactNode
}

export function ImageComponent({ imagePath, children }: ImageType) {
    return (
        <div className="relative flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
                width={234}
                height={234}
                quality={100}
                src={`/images/illustrations/${imagePath}.png`}
                alt="Ilustração"
            />
            {children}
        </div>
    )
}
