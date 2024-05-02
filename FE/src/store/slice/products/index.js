import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    categories: [],
}
const productslice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setproducts: (state, action) => {
            state.products = action.payload.products
        },
    }
})
export const { setproducts } = productslice.actions
export const productReducer = productslice.reducer

