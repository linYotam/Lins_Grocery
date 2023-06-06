import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateProducts } from "../reducers/productsSlice";
import { updateFilterProducts } from "../reducers/filterProductsSlice";
import { updateCategories } from "../reducers/categoriesSlice";
import { updateSaleProducts } from "../reducers/saleProductsSlice";
import { loadCart } from "../reducers/cartSlice";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get("https://localhost:7062/api/Categories");
      dispatch(updateCategories([...response.data]));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { dispatch }) => {
    const response = await axios.get("https://localhost:7062/api/Products");
    const newData = response.data.map((product) => {
      product.imageData = `https://localhost:7062${product.imageData}`;
      return product;
    });
    dispatch(updateProducts([...newData]));
    dispatch(updateFilterProducts([...newData]));
    const saleProducts = newData.filter((product) => product.discount > 0);
    dispatch(updateSaleProducts(saleProducts));
    return newData;
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ token, products }, { dispatch }) => {
    const userId = token.id;
    const response = await axios.get(
      `https://localhost:7062/api/Cart/${userId}`
    );
    const userCart = response.data;
    const cart = userCart.map((cartItem) => {
      const { id, quantity, userId } = cartItem;
      const product = products.find((item) => item.id === id);
      return { product, amount: quantity, userId };
    });
    dispatch(loadCart(cart));
    return cart;
  }
);
