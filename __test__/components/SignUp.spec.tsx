import { SignUpComponent } from '@/components/SignUpComponent'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null,
        }
    },
}))

describe('<SignUpComponent>', () => {
    beforeEach(() => {
        render(<SignUpComponent />)
    })

    it('Should render SignUpComponent correctly', async () => {
        const inputUsername = screen.getByPlaceholderText(/JohnDurant/i)
        const inputEmail = screen.getByPlaceholderText(/johndoe@example.com/i)
        const buttonSubmit = screen.getByRole('button', { name: /Sign Up/i })

        expect(inputUsername).toBeVisible()
        expect(inputEmail).toBeVisible()
        expect(buttonSubmit).toBeVisible()
    })

    it('Should show error messages when fields are empty', async () => {
        const buttonSubmit = screen.getByRole('button', { name: /Sign Up/i })

        await act(async () => {
            await userEvent.click(buttonSubmit)
        })

        await waitFor(() => {
            expect(screen.getByText(/Invalid email/i)).toBeVisible()
            expect(screen.getByText(/The username must contain 5 digits!/i)).toBeVisible()
            expect(screen.getByText(/Please confirm your password/i)).toBeVisible()
            expect(screen.getByText(/Password is required/i)).toBeVisible()
        })
    })

    it('Should clear error messages when valid input is provided', async () => {
        const inputUsername = screen.getByPlaceholderText(/JohnDurant/i)
        const inputEmail = screen.getByPlaceholderText(/johndoe@example.com/i)
        const inputPassword = screen.getByPlaceholderText(/Secret!/i)
        const inputConfirmPassword = screen.getByPlaceholderText(/Secret Confirm!/i)
        const buttonSubmit = screen.getByRole('button', { name: /Sign Up/i })

        act(async () => {
            await userEvent.type(inputEmail, 'valid@email.com')
            await userEvent.type(inputUsername, 'ValidUser')
            await userEvent.type(inputPassword, 'Password123')
            await userEvent.type(inputConfirmPassword, 'Password123')
            await userEvent.click(buttonSubmit)
        })

        await waitFor(() => {
            expect(screen.queryByText(/Invalid email/i)).not.toBeInTheDocument()
            expect(screen.queryByText(/The username must contain 5 digits!/i)).not.toBeInTheDocument()
            expect(screen.queryByText(/Please confirm your password/i)).not.toBeInTheDocument()
            expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument()
        })
    })
})
