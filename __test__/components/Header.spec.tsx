import Header from '@/components/Header'
import { render, waitFor } from '@testing-library/react'

describe('<Button>', () => {
    it('Should be render the header', () => {
        const { getByText } = render(<Header isAdm={false} showContent={false} />)

        expect(getByText(`Arthur's`)).toBeDefined()
    })

    it('Should be render the header with the content', () => {
        const { getByText } = render(<Header isAdm={false} showContent={true} />)

        expect(getByText('Portfolio')).toBeDefined()
    })

    it('Should be render the header with navbar admin', async () => {
        const { getByText } = render(<Header isAdm={true} />)

        await waitFor(() => {
            expect(getByText('Dashboard')).toBeDefined()
        })
    })
})
