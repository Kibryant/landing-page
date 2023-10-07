type SubtitleType = {
    subtitle: string
}

export function Subtitle({ subtitle }: SubtitleType) {
    return (
        <div className="text-gray-700 max-w-lg">
            <p>{subtitle}</p>
        </div>
    )
}
