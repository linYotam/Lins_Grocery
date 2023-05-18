import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const filterProductsSlice = createSlice({
  name: 'filterProducts',
  initialState,
  reducers: {
    updateFilterProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFilterProducts } = filterProductsSlice.actions;

export default filterProductsSlice.reducer;
