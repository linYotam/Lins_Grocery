import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const saleProductsSlice = createSlice({
  name: "saleProducts",
  initialState,
  reducers: {
    updateSaleProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSaleProducts } = saleProductsSlice.actions;

export default saleProductsSlice.reducer;
