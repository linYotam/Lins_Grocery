import { configureStore } from '@reduxjs/toolkit';
import filterProductsReducer from './reducers/filterProductsSlice';
import productsReducer from './reducers/productsSlice';
import categoriesReducer from './reducers/categoriesSlice';
import cartReducer from './reducers/cartSlice';
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filterProducts: filterProductsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
