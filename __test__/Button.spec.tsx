import { render, screen } from '@testing-library/react'
import Button from '@/components/Button'

describe('<Button>', () => {
    it('Should be render', () => {
        const { getByText, getByRole } = render(<Button>Oie</Button>)

        expect(getByText('Oie')).toBeInTheDocument()
        expect(getByRole('button')).toBeInTheDocument()
    })
    it(`Should be render "Loading..." when isLoading was passed`, () => {
        const { getByText } = render(<Button isLoading={true}>Oie</Button>)

        expect(getByText('Loading...')).toBeInTheDocument()
    })
})
