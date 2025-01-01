import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import axios from "axios";
export const Complaints = createAsyncThunk(
  "OrderComplaints/AddComplaint",
  async (
    { Order_id, Customer_id, Complaint_text, Resolution_status },
    thunkAPI
  ) => {
    try {
      console.log("Complaint details received: ", {
        Order_id,
        Customer_id,
        Complaint_text,
        Resolution_status
      });

      // Make a POST request to your Express backend
      const response = await axios.post("http://localhost:3000/api/addComplaint", {
        Order_id: Order_id,
        Customer_id: Customer_id,
        Complaint_text: Complaint_text,
        Resolution_status: Resolution_status,
      });

      console.log("Complaint added successfully:", response.data); // Log response from the backend
      return response.data.complaint; // Assuming your Express API returns the added complaint in the "complaint" field
    } catch (err) {
      console.error("Failed to add complaint:", err.message);
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to add complaint");
    }
  }
);







 

const ComplaintsSlice = createSlice({
  name: 'Complaints',
  initialState: {
    Views: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
 
     
 

      //Push Views  
      .addCase(Complaints.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Complaints.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Views.push(action.payload);


       })
      .addCase(Complaints.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
});

export const { setReview } = ComplaintsSlice.actions;

export default ComplaintsSlice.reducer;

