import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;
