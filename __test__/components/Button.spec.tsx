import { render } from '@testing-library/react'
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

    it('Should be render the button with background-color green', () => {
        const { getByRole } = render(<Button isLoading={true}>Oie</Button>)

        const buttonElement = getByRole('button')

        expect(buttonElement).toHaveStyle({
            backgroundColor: 'rgb(34 197 94)',
        })
    })

    it('Should be render the button disabled', () => {
        const { getByRole } = render(<Button isLoading={true}>Oie</Button>)

        const buttonElement = getByRole('button')

        expect(buttonElement).toBeDisabled()
    })
})
