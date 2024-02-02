import { createSlice } from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [], //in each index, there is an object having 2 properties (item and quantity)
    },
    reducers: {
        add: (state, action) => {

            // console.log(state.cart);
            const newItem = action.payload; // Assuming action.payload is a object having 2 properties, 1 having post information and other is quantity
            const existingItem = state.cart.find((cartItem) => cartItem.item.id === newItem.post.id)

            //Above expression will return the entire object if we found item already in cart
            //existingItem is an object with a structure like { item: {...}, quantity: ... }
            if (existingItem)
                existingItem.quantity += newItem.quantity;

            else
                state.cart.push({ item: newItem.post, quantity: newItem.quantity })
        },
        remove: (state, action) => {
            const itemToRemove = action.payload;
            console.log("removed")
            state.cart = state.cart.filter((cartItem) => cartItem.item.id !== itemToRemove.post.id);
        },
    },
});


export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;


/*

CartSlice:-

1. state: This is the overall Redux state, which is a single JavaScript object that contains
   all the slices of your application state. Each slice corresponds to a specific feature or
   part of your application.

2. state.cart: This specifically refers to the slice of the state managed by the cart reducer.
   In your case, it's an object with a property named cart, which is an array.

3. So, state.cart is an array that holds information about the items added to the cart.
   Each element in this array seems to be an object with at least two properties: item 
   (representing the product) and quantity (representing the quantity of that item in the cart).

*/