import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Axios is used for making HTTP requests
 





export const ReviewView = createAsyncThunk(
  "Reviews/ReviewView",
  async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Reviews");
      if (!response.ok) {
        throw new Error("Failed to fetch Views");
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      return data; // Return the entire data object
    } catch (error) {
      throw new Error(error.message);
    }
  }
);



export const AddReview = createAsyncThunk(
  "Reviews/AddReview",
  async (
    { Product_id, Customer_id, Rating, Comment },
    thunkAPI
  ) => {
    try {
      console.log("Review details received: ", {
        Product_id,
        Customer_id,
        Rating,
        Comment
      });

      // Make a POST request to your Express backend
      const response = await axios.post("http://localhost:3000/api/addReview", {
        Product_id: Product_id,
        Customer_id: Customer_id,
        Rating: Rating,
        Comment: Comment
      });

      console.log("Review added successfully:", response.data); // Log response from the backend
      return response.data.review; // Assuming your Express API returns the added review in the "review" field
    } catch (err) {
      console.error("Failed to add review:", err.message);
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to add review");
    }
  }
);







 

const AddReviewSlice = createSlice({
  name: 'Review',
  initialState: {
    Views: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
 
       .addCase(ReviewView.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       .addCase(ReviewView.fulfilled, (state, action) => {
         state.loading = false;
         state.Views = action.payload; // Directly assign the payload to Views
       })
       .addCase(ReviewView.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message;
       })
 

      //Push Views  
      .addCase(AddReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Views.push(action.payload);


       })
      .addCase(AddReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
});

export const { setReview } = AddReviewSlice.actions;

export default AddReviewSlice.reducer;

