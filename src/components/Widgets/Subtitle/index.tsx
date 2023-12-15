type SubtitleType = {
    subtitle: string
}

export function Subtitle({ subtitle }: SubtitleType) {
    return (
        <div className="max-w-lg">
            <p>{subtitle}</p>
        </div>
    )
}
