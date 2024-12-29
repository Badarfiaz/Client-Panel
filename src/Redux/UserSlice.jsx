import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action for logging in
export const loginUserThunk = createAsyncThunk(
  "user/loginUserThunk",
  async (formData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        return data.customer;  // Return the customer data (including customerId)
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed. Please try again.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    customerId: null,
    name: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customerId = action.payload.customerId;
        state.name = action.payload.name;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default userSlice.reducer;
