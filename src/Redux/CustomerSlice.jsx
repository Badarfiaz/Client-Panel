import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Axios is used for making HTTP requests

export const CustomerFetch = createAsyncThunk(
  "Product/fetchProductsData",
  async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      return data; // Return the entire data object
    } catch (error) {
      throw new Error(error.message);
    }
  }
);


export const addCustomers = createAsyncThunk(
    "Customer/addCustomers",
    async ({Customerid  , firstName, lastName, email, phoneNumber, address , city , Customer_Password}, thunkAPI) => {
        
        try {
            // Make a POST request to your Express backend
            const response = await axios.post('http://localhost:3000/api/addCustomer', {
              Customer_id:Customerid,
              first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phoneNumber,
                address: address,
                city: city,
                Customer_Password:Customer_Password
            });
            
            console.log('Thunk customer: ', data);
            
            console.log("Customer added successfully:", response.data); // Log response from the backend
            return response.data.customer; // Assuming your Express API returns the added customer in the "customer" field
        } catch (err) {
            console.error("Failed to add customer:", err.message);
            return thunkAPI.rejectWithValue(err.response?.data || "Failed to add customer");
        }
        
    }
  );
  






 

const CustomerSlice = createSlice({
  name: 'Customer',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CustomerFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CustomerFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Directly assign the payload to products
      })
      .addCase(CustomerFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Push products  
      .addCase(addCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);


       })
      .addCase(addCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
});
export const { setCustomers } = CustomerSlice.actions;

export default CustomerSlice.reducer;

