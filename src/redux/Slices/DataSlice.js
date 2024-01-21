import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllData = createAsyncThunk("allPosts", async (args, { rejectWithValue }) => {
    const response = await fetch("https://fakestoreapi.com/products");

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue("Oops, found an error");
    }
});

const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        posts: [],
        loading: false,
        error: null
    },
    reducers: {}, // You can leave this as an empty object if you don't have any additional reducers
    extraReducers: (builder) => {
        builder
            .addCase(getAllData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllData.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getAllData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default postSlice.reducer;


//updated our extraReducers field to use the 'builder callback' syntax
//extraReducers now takes a builder parameter, and the cases are defined
// using the builder object with the addCase method.