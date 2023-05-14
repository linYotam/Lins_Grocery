import { configureStore } from "@reduxjs/toolkit";
import filterProductsReducer from "../features/filterProducts/filterProductsSlice";
import productsReducer from "../features/products/productsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filterProducts: filterProductsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
});
