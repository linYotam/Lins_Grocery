import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
