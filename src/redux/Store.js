import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./Slices/CartSlice";
import postSlice from './Slices/DataSlice'

export const store = configureStore({
    reducer: {
        cart: CartSlice.reducer,
        app: postSlice, //app is a key, you can give any key 
    }
});