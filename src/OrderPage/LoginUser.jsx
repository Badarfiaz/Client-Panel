import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../Redux/UserSlice";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { cssTransition } from "react-toastify";
import 'animate.css'; // Ensure animate.css is loaded

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});

export default function Login() {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const { customerId, name, status, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserThunk(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Box component="div" sx={{ "& > :not(style)": { m: 1, width: "100%" } }}>
          <TextField
            id="outlined-name"
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            id="outlined-password"
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Box>
        <button
          type="submit"
          className={`w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${bounce.enter}`}
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
        <Link
          to="/Sign-in"
          className={`block w-full py-2 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600 ${bounce.exit}`}
        >
          Sign Up
        </Link>
      </form>

      {status === "succeeded" && (
        <div className="mt-4 text-green-500">
          <p>Login successful!</p>
          <p>Customer ID: {customerId}</p>
          <p>Name: {name}</p>
        </div>
      )}

      {status === "failed" && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
  