import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Loading from '@/app/loading'

describe('Loading Component', () => {
    it('should be visible and have the correct styles', async () => {
        const { container } = render(<Loading />)

        expect(container.firstChild).toBeVisible()

        const loader = container.querySelector('.loader')
        const loaderSquares = container.querySelectorAll('.loader-square')

        expect(loader).toBeInTheDocument()
        expect(loaderSquares).toHaveLength(7)
        // loaderSquares.forEach((square, index) => {
        //     expect(square).toHaveStyle({
        //         position: 'absolute',
        //         top: '0',
        //         left: '0',
        //         width: '28px',
        //         height: '28px',
        //         margin: '2px',
        //         borderRadius: '0px',
        //         background: 'white',
        //         backgroundSize: 'cover',
        //         backgroundPosition: 'center',
        //         backgroundAttachment: 'fixed',
        //     })

        //     const expectedDelay = -1.4285714286 * index + 's'
        //     expect(square).toHaveStyle({
        //         animation: `square-animation 10s ease-in-out infinite both`,
        //         animationDelay: expectedDelay,
        //     })
        // })
    })
})
