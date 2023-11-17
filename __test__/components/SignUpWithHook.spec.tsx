import React from 'react'
import { render, screen } from '@testing-library/react'
import { SignUpComponent } from '@/components/SignUpComponent'

// Mock the useSignUp hook to provide mock values
jest.mock('../../src/components/SignUpComponent/hook/useSignUp', () => ({
    useSignUp: () => ({
        errors: {},
        handleSignUp: jest.fn(),
        isLoading: false,
        messageFromApi: { error: '' },
        register: jest.fn(),
        handleSubmit: jest.fn(),
    }),
}))

test('renders SignUpComponent and checks form elements', () => {
    render(<SignUpComponent />)

    // Check if the form elements are rendered
    const emailInput = screen.getByPlaceholderText('johndoe@example.com')
    const usernameInput = screen.getByPlaceholderText('JohnDurant')
    const passwordInput = screen.getByPlaceholderText('Secret!')
    const passwordConfirmInput = screen.getByPlaceholderText('Secret Confirm!')
    const signUpButton = screen.getByText('Sign Up')
    const signInLink = screen.getByText('Sign-In')

    expect(emailInput).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(passwordConfirmInput).toBeInTheDocument()
    expect(signUpButton).toBeInTheDocument()
    expect(signInLink).toBeInTheDocument()
})
