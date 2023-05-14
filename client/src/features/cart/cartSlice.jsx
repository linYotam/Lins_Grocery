import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // array of {product, quantity} objects
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action) => {
      state.items = action.payload;
      state.totalCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    updateCart: (state, action) => {
      const { product, amount } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      //Product is already in the cart
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        //Remove entire product from cart
        if (amount === 0) {
          // Remove the existing item from the cart
          state.items.splice(existingItemIndex, 1);
          state.totalCount -= existingItem.amount;
        } else {
          //Remove previous quantity
          state.totalCount =
            state.totalCount - state.items[existingItemIndex].amount + amount;

          // Product is already in the cart, increase the updated quantity
          state.items[existingItemIndex].amount = amount;
        }
      } else {
        // Product is not in the cart, add a new item
        state.items.push({ product, amount });
        state.totalCount += amount;
      }
    },
  },
});

export const { updateCart, loadCart } = cartSlice.actions;

export default cartSlice.reducer;
