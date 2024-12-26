import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from './ProductsSlice'
import AddToCart  from "./AddToCart";
import CustomerSlice from './CustomerSlice'
const store = configureStore({
  reducer: {
    admin: ProductsSlice, // Ensure the 'admin' slice is correctly named
    cart:AddToCart,
    Customer:CustomerSlice,
  },
});

export default store;
