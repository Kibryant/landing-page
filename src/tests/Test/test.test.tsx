import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Test from '@/components/Test'

test('My first test!', async () => {
    render(<Test />)

    await screen.findByText('Hello My Name is Arthur!', {}, { timeout: 10000 })

    const h2Element = screen.getByText('Hello My Name is Arthur!')

    expect(h2Element).toBeDefined()
})
