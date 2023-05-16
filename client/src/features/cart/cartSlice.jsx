import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [], // array of {product, quantity} objects
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action) => {
      console.log("payload: ", action.payload);
      state.items = action.payload;
      state.totalCount = action.payload.reduce(
        (sum, item) => sum + item.amount,
        0
      );
    },
    updateCart: (state, action) => {
      const { product, amount } = action.payload;

      const UserCartModel = {
        UserId: 2,
        ProductId: product.id,
        Quantity: amount,
      };

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

          axios
            .delete(`https://localhost:7062/api/Cart/${product.id}`)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          //Remove previous quantity
          state.totalCount =
            state.totalCount - state.items[existingItemIndex].amount + amount;

          // Product is already in the cart, increase the updated quantity
          state.items[existingItemIndex].amount = amount;

          axios
            .post("https://localhost:7062/api/Cart", UserCartModel)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else {
        // Product is not in the cart, add a new item
        state.items.push({ product, amount });
        state.totalCount += amount;

        axios
          .post("https://localhost:7062/api/Cart", UserCartModel)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    removeItem: (state, action) => {
      const { product } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex !== -1) {
        axios
          .delete(`https://localhost:7062/api/Cart/${product.id}`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
        const existingItem = state.items[existingItemIndex];
        // Remove the existing item from the cart
        state.items.splice(existingItemIndex, 1);
        state.totalCount -= existingItem.amount;
      }
    },
  },
});

export const { updateCart, loadCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
