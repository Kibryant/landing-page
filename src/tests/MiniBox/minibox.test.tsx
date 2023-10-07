import { MiniBox } from '@/components/MiniBox'
import { CogIcon } from '@heroicons/react/24/outline'
import { render } from '@testing-library/react'
import { expect, test } from 'vitest'

test('My Second Test', () => {
    render(<MiniBox Icon={CogIcon} text="FDSANIOFIOUJAN" />)

    const spanElement = document.querySelector('span')

    expect(spanElement).not.toBeNull()
})
