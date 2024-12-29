import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Axios is used for making HTTP requests
 

export const AddOrders = createAsyncThunk(
    "Orders/AddOrders",
    async (
      {  Customer_id, Product_id, quantity, total_amount, order_status, payment_method  },
      thunkAPI
    ) => {
      try {
        console.log("Order details received: ", {
           Customer_id,
          Product_id,
          quantity,
          total_amount,
          order_status,
          payment_method,
         });
  
        // Make a POST request to your Express backend
        const response = await axios.post("http://localhost:3000/api/addOrders", {
            Customer_id: Customer_id,
          Product_id: Product_id,
          quantity: quantity,
          total_amount: total_amount,
          order_status: order_status,
          payment_method: payment_method,
         });
  
        console.log("Order added successfully:", response.data); // Log response from the backend
        return response.data.Orders; // Assuming your Express API returns the added Orders in the "Orders" field
      } catch (err) {
        console.error("Failed to add Orders:", err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Failed to add Orders");
      }
    }
  );
  
  






 

const OrdersSlice = createSlice({
  name: 'Orders',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
 

      //Push products  
      .addCase(AddOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);


       })
      .addCase(AddOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
});
export const { setOrders } = OrdersSlice.actions;

export default OrdersSlice.reducer;

