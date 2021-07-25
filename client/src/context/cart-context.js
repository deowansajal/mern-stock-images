import React, { useReducer, useCallback } from 'react'

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    RESET_CART,
} from '../actionTypes/actionTypes'

const initialCart = {
    items: [],
    cartSubtotal: 0,
    cartTotal: 0,
    totalCartItems: 0,
}

const sumCartSubtotal = items => {
    return items.reduce((acc, item) => {
        return acc + (item.price || 0)
    }, 0)
}

export const CartContext = React.createContext({
    cart: { ...initialCart },
    addToCart: cartItem => {},
    removeFromCart: id => {},
    resetCart: () => {},
})

const addCartItem = (state, action) => {
    const { items } = state

    const hasCartItem =
        items.length > 0 && items.some(item => item.id === action.cartItem.id)

    if (hasCartItem) {
        return state
    }
    action.cartItem.isAddedToCart = true

    const newItems = items.concat(action.cartItem)

    return {
        ...state,
        items: newItems,
        cartSubtotal: sumCartSubtotal(newItems),
        cartTotal: sumCartSubtotal(newItems),
        totalCartItems: newItems.length,
    }
}

const removeCartItem = (state, action) => {
    const { items } = state

    const newItems = items.filter(item => item.id !== action.id)

    return {
        ...state,
        items: newItems,
        cartSubtotal: sumCartSubtotal(newItems),
        cartTotal: sumCartSubtotal(newItems),
        totalCartItems: newItems.length,
    }
}

const cartReducer = (state, action) => {
    let newCart
    switch (action.type) {
        case ADD_TO_CART:
            newCart = addCartItem(state, action)
            localStorage.setItem('cart', JSON.stringify(newCart))
            return newCart

        case REMOVE_FROM_CART:
            newCart = removeCartItem(state, action)
            localStorage.setItem('cart', JSON.stringify(newCart))
            return newCart

        case RESET_CART:
            localStorage.setItem('cart', JSON.stringify(initialCart))
            return {
                ...initialCart,
            }
        default:
            return state
    }
}

const parsedCart = stringCart => {
    if (stringCart) {
        return JSON.parse(stringCart)
    }

    return { ...initialCart }
}

const CartProvider = ({ children }) => {
    const cart = localStorage.getItem('cart')
    const [state, dispatch] = useReducer(cartReducer, parsedCart(cart))

    const addToCart = cartItem => {
        dispatch({ type: ADD_TO_CART, cartItem })
    }
    const removeFromCart = id => dispatch({ type: REMOVE_FROM_CART, id })
    const resetCart = useCallback(() => dispatch({ type: RESET_CART }), [])

    const value = {
        addToCart,
        removeFromCart,
        resetCart,
        cart: state,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
