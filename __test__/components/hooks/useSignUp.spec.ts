import { useSignUp } from '@/components/SignUpComponent/hook/useSignUp'
import { renderHook } from '@testing-library/react'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null,
        }
    },
}))

describe('useSignUp', () => {
    it('should', () => {
        const { result } = renderHook(() => useSignUp())

        expect(result.current.isLoading).toBe(false)
        expect(result.current.messageFromApi).toMatchObject({
            error: '',
            success: '',
        })
    })
})

// jest.mock('next/navigation', () => ({
//     useRouter: () => ({
//         push: jest.fn(),
//         __esModule: true,
//     }),
// }))

// describe('useSignUp', () => {
//     it('should handle form submission', async () => {
//         const push = jest.fn()
//         const router = useRouter()

//         const { result } = renderHook(() => useSignUp())
//         const { register, handleSignUp } = result.current

//         const fakeUser = {
//             email: 'fakeemail@example.com',
//             username: 'fakeuser',
//             password: 'fakepassword',
//             passwordConfirm: 'fakepassword',
//         }

//         act(() => {
//             register('email')
//             register('username')
//             register('password')
//             register('passwordConfirm')
//         })

//         await act(async () => {
//             await handleSignUp(fakeUser)
//         })

//         expect().toHaveBeenCalledWith('/clients')
//     })
// })
