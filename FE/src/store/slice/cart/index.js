import { createSlice } from "@reduxjs/toolkit";
import { APP_CONFIG } from "../../../config/appConfig";

const initialState = {
    cart: JSON.parse(localStorage.getItem((APP_CONFIG.LOCAL_STORAGE_ITEMS.CART))) || []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const findIndex = state.cart.findIndex(item => item._id === action.payload._id)
            if (findIndex === -1) {
                state.cart = [...state.cart, action.payload]
                localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_ITEMS.CART, JSON.stringify(state.cart))
            }
            else {
                state.cart[findIndex].quantity = action.payload.quantity + state.cart[findIndex].quantity
                localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_ITEMS.CART, JSON.stringify(state.cart))
            }
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload._id)
            localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_ITEMS.CART, JSON.stringify(state.cart))
        },
        deleteCart: (state) => {
            state.cart = []
            localStorage.removeItem(APP_CONFIG.LOCAL_STORAGE_ITEMS.CART)
        }
        ,
        changeQuantity: (state, action) => {
            const findIndex = state.cart.findIndex(item => item._id === action.payload._id)
            state.cart[findIndex].quantity = action.payload.quantity
            localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_ITEMS.CART, JSON.stringify(state.cart))
        }
    }
})
export const { addToCart, removeItem, deleteCart, changeQuantity } = cartSlice.actions
export const cartReducer = cartSlice.reducer