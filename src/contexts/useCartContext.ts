import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Cart, Product } from './CartContext'

const useCartContext = () => {
    const [cart, setCart] = useState<Cart>({
        product: [],
        totalCartPrice: 0,
        totalCartQuantity: 0,
    })

    const notifyDeletedOrDecreasedProductOfCart = (msg: string) => toast.error(msg)
    const notifyAddingProductToCart = (msg: string) => toast.success(msg)

    const calculateCartTotalPrice = (cartProducts: Product[]) => {
        let totalPrice = 0

        for (const product of cartProducts) {
            totalPrice += parseFloat(product.price) * product.totalQuantiyOfProduct
        }

        return totalPrice
    }

    const addProductToCart = (product: Product) => {
        const existingProduct = cart.product.find((item) => item.id === product.id)

        if (existingProduct) {
            cart.totalCartQuantity++
            cart.totalCartPrice += +product.price
            existingProduct.totalQuantiyOfProduct++
            existingProduct.totalPriceOfProduct =
                parseFloat(existingProduct.price) * existingProduct.totalQuantiyOfProduct
            setCart({ ...cart, totalCartPrice: cart.totalCartPrice })
            notifyAddingProductToCart(`${existingProduct.product} incremented to your cart!`)
        } else {
            const updatedCart = {
                ...cart,
                product: [
                    ...cart.product,
                    { ...product, totalQuantiyOfProduct: 1, totalPriceOfProduct: parseFloat(product.price) },
                ],
                totalCartQuantity: cart.totalCartQuantity + 1,
                totalCartPrice: cart.totalCartPrice + parseFloat(product.price),
            }
            notifyAddingProductToCart(`${product.product} adding to your cart!`)
            setCart(updatedCart)
        }
    }

    const removeProductToCart = (product: Product) => {
        // Verifique se o produto a ser removido está no carrinho
        const existingProduct = cart.product.find((item) => item.id === product.id)

        if (existingProduct) {
            if (existingProduct.totalQuantiyOfProduct > 1) {
                cart.totalCartQuantity--
                cart.totalCartPrice -= +product.price
                existingProduct.totalQuantiyOfProduct--
                existingProduct.totalPriceOfProduct =
                    parseFloat(existingProduct.price) * existingProduct.totalQuantiyOfProduct
                setCart({ ...cart, totalCartPrice: cart.totalCartPrice, totalCartQuantity: cart.totalCartQuantity })
                notifyDeletedOrDecreasedProductOfCart(`${existingProduct.product} decremented of your cart!`)
            } else {
                const updatedProductList = cart.product.filter((item) => item.id !== product.id)
                const updatedCart = {
                    product: updatedProductList,
                    totalCartQuantity: cart.totalCartQuantity - 1,
                    totalCartPrice: calculateCartTotalPrice(updatedProductList),
                }
                notifyDeletedOrDecreasedProductOfCart(`${product.product} removed from your cart!`)
                setCart(updatedCart)
            }
        } else {
            notifyDeletedOrDecreasedProductOfCart('You dont have this product in your cart!')
        }
    }

    useEffect(() => {
        const savedCart = window.localStorage.getItem('cart')

        if (savedCart) {
            setCart(JSON.parse(savedCart))
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return {
        cart,
        addProductToCart,
        calculateCartTotalPrice,
        removeProductToCart,
    }
}

export { useCartContext }

// const addProductToCart = (product: Product) => {
//     console.log(product)
//     const theProductAlreadyExistsInTheCart = cart.product.map((productCart) => productCart.id === product.id)
//     if (theProductAlreadyExistsInTheCart) {
//         const updatedCart = cart.product.map((productCart) =>
//             // productCart.id === product.id
//             //     && {
//             //         totalCartQuantity: cart.totalCartQuantity + 1,
//             //         totalCartPrice: cart.totalCartPrice + parseFloat(product.price),
//             //         product: {
//             //             ...product,
//             //             totalPriceOfProduct: parseFloat(product.price) + product.totalPriceOfProduct,
//             //             totalQuantiyOfProduct: product.totalQuantiyOfProduct + 1,
//             //         },
//             //     }
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
//     // if (cart.product.length === 0) {
//     //     notifyError('The cart is empty!')
//     //     return;
//     // }
//     // const theProductExistsInTheCart = cart.product.findIndex((productCart) => productCart.id === productToRemove.id)

//     // if (theProductExistsInTheCart === -1) {
//     //     notifyError('You dont have this product in the cart!')
//     //     return;
//     // }

//     // if (productToRemove.totalQuantiyOfProduct > 1) {
//     //     const updatedCart = cart.product.map((productCart) => productCart.id === productToRemove.id
//     //         ? {
//     //             ...item,
//     //             totalCartQuantity: item.totalCartQuantity - 1,
//     //             totalCartPrice: item.totalCartPrice - +productToRemove.price,
//     //             product: {
//     //                 ...productToRemove,
//     //                 totalPriceOfProduct: +productToRemove.price - productToRemove.totalPriceOfProduct,
//     //                 totalQuantiyOfProduct: productToRemove.totalQuantiyOfProduct - 1,
//     //             },
//     //         }
//     //         : productCart,)

//     //     notifyError(`Decreased product quantity: ${productToRemove.totalQuantiyOfProduct}`)

//     //     setCart(updatedCart)
//     //     return
//     // }

//     // const updateCart = cart.filter((item) => item.product.id !== productToRemove.id)
//     // notifyError(`Product: ${productToRemove.product} removed from cart!`)
//     // setCart(updateCart)
// }
