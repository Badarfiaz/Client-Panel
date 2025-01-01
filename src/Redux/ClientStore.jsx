import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from './ProductsSlice'
import AddToCart  from "./AddToCart";
import CustomerSlice from './CustomerSlice'
import OrderSlice from '../Redux/OrderSlice'
import UserSlice from '../Redux/UserSlice'
import AddReviewSlice from '../Redux/AddReviewSlice'
import AddComplaints from '../Redux/AddComplaints'
const store = configureStore({
  reducer: {
    admin: ProductsSlice, // Ensure the 'admin' slice is correctly named
    cart:AddToCart,
    Customer:CustomerSlice,
    Orders:OrderSlice,
    user:UserSlice,
    Review:AddReviewSlice,
    Complaints:AddComplaints,
  },
});

export default store;
