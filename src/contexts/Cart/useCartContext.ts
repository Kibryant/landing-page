import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { Cart } from './CartContext'
import Product from '@/core/product/entity/Product'

const useCartContext = () => {
    const [cart, setCart] = useState<Cart>({
        product: [],
        totalCartPrice: 0,
        totalCartQuantity: 0,
    })

    const notifyDeletedOrDecreasedProductOfCartOrExistsProduct = useCallback((msg: string) => toast.error(msg), [])
    const notifyAddingProductToCart = useCallback((msg: string) => toast.success(msg), [])

    const addProductToCart = useCallback(
        (product: Product) => {
            setCart((prevCart) => {
                const theProductAlreadyExistsInTheCart = prevCart.product.some(
                    (productCart) => productCart.id === product.id,
                )

                if (theProductAlreadyExistsInTheCart) {
                    notifyDeletedOrDecreasedProductOfCartOrExistsProduct('Product already exists in the cart!')
                    return prevCart
                } else {
                    notifyAddingProductToCart(`Product: ${product.name} added to cart!`)
                    return {
                        ...prevCart,
                        totalCartQuantity: 1 + prevCart.totalCartQuantity,
                        totalCartPrice: prevCart.totalCartPrice + parseFloat(product.price),
                        product: [...prevCart.product, product],
                    }
                }
            })
        },
        [notifyAddingProductToCart, notifyDeletedOrDecreasedProductOfCartOrExistsProduct],
    )
    const removeProductToCart = useCallback(
        (product: Product) => {
            const theProductExistsInTheCart = cart.product.findIndex((productCart) => productCart.id === product.id)

            if (theProductExistsInTheCart === -1) {
                notifyDeletedOrDecreasedProductOfCartOrExistsProduct('You dont have this product in the cart!')
                return
            }

            const updateCart = cart.product.filter((productCart) => productCart.id !== product.id)
            notifyDeletedOrDecreasedProductOfCartOrExistsProduct(`Product: ${product.name} removed from cart!`)
            setCart({
                ...cart,
                totalCartPrice: cart.totalCartPrice - parseFloat(product.price),
                totalCartQuantity: cart.totalCartQuantity - 1,
                product: updateCart,
            })
        },
        [cart, notifyDeletedOrDecreasedProductOfCartOrExistsProduct],
    )

    return {
        cart,
        addProductToCart,
        removeProductToCart,
    }
}

export { useCartContext }

// const addProductToCart = (product: Product) => {
//     console.log(product)
//     const theProductAlreadyExistsInTheCart = cart.product.map((productCart) => productCart.id === product.id)
//     if (theProductAlreadyExistsInTheCart) {
//         const updatedCart = cart.product.map((productCart) =>
//             productCart.id === product.id
//                 && {
//                     totalCartQuantity: cart.totalCartQuantity + 1,
//                     totalCartPrice: cart.totalCartPrice + parseFloat(product.price),
//                     product: {
//                         ...product,
//                         totalPriceOfProduct: parseFloat(product.price) + product.totalPriceOfProduct,
//                         totalQuantiyOfProduct: product.totalQuantiyOfProduct + 1,
//                     },
//                 }
//             productCart.id === product.id ? {
//                 ...productCart,
//                 totalPriceOfProduct: parseFloat(productCart.price) + productCart.totalPriceOfProduct,
//                 totalQuantiyOfProduct: productCart.totalQuantiyOfProduct + 1,

//             } : productCart
//         )
//         notifySucess('Quantity of product incremented!')
//         setCart({ ...cart, totalCartQuantity: 1 + cart.totalCartQuantity, totalCartPrice: cart.totalCartPrice, product: updatedCart })
//         return;
//     }

//     setCart({ totalCartQuantity: 1, totalCartPrice: parseFloat(product.price), product: [product] })
//     notifySucess(`Product: ${product.product} added to cart!`)
// }

// const removeProductToCart = (productToRemove: Product) => {
//     if (cart.product.length === 0) {
//         notifyError('The cart is empty!')
//         return;
//     }
//     const theProductExistsInTheCart = cart.product.findIndex((productCart) => productCart.id === productToRemove.id)

//     if (theProductExistsInTheCart === -1) {
//         notifyError('You dont have this product in the cart!')
//         return;
//     }

//     if (productToRemove.totalQuantiyOfProduct > 1) {
//         const updatedCart = cart.product.map((productCart) => productCart.id === productToRemove.id
//             ? {
//                 ...item,
//                 totalCartQuantity: item.totalCartQuantity - 1,
//                 totalCartPrice: item.totalCartPrice - +productToRemove.price,
//                 product: {
//                     ...productToRemove,
//                     totalPriceOfProduct: +productToRemove.price - productToRemove.totalPriceOfProduct,
//                     totalQuantiyOfProduct: productToRemove.totalQuantiyOfProduct - 1,
//                 },
//             }
//             : productCart,)

//         notifyError(`Decreased product quantity: ${productToRemove.totalQuantiyOfProduct}`)

//         setCart(updatedCart)
//         return
//     }

//     const updateCart = cart.filter((item) => item.product.id !== productToRemove.id)
//     notifyError(`Product: ${productToRemove.product} removed from cart!`)
//     setCart(updateCart)
// }
