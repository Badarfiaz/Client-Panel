import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from './ProductsSlice'
import AddToCart  from "./AddToCart";
import CustomerSlice from './CustomerSlice'
import OrderSlice from '../Redux/OrderSlice'
import UserSlice from '../Redux/UserSlice'
const store = configureStore({
  reducer: {
    admin: ProductsSlice, // Ensure the 'admin' slice is correctly named
    cart:AddToCart,
    Customer:CustomerSlice,
    Orders:OrderSlice,
    user:UserSlice
  },
});

export default store;
