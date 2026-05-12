import { createSlice } from "@reduxjs/toolkit";

/**
 * Lightweight wishlist slice. Persists *only* the product IDs the user
 * has favorited; the full product object is looked up from the products
 * list at render time.
 */
const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    ids: [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((existing) => existing !== id);
      } else {
        state.ids.push(id);
      }
    },
    clearWishlist: (state) => {
      state.ids = [];
    },
  },
});

export const { toggleWishlist, clearWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
