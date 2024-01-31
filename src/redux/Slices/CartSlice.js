import { createSlice } from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        add: (state, action) => {
            state.cart.push(action.payload);
        },
        remove: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
    },
});


export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;