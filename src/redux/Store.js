import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./Slices/CartSlice";
import postSlice from "./Slices/DataSlice";
import wishlistReducer from "./Slices/WishlistSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    app: postSlice,
    wishlist: wishlistReducer,
  },
});
