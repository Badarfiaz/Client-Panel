import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomers } from "../Redux/CustomerSlice";
import { motion } from "framer-motion";

export default function CreateUser() {
 
  const [user, setUser] = useState({
    Customer_id: "",  // Manually input Customer ID
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    Customer_Password: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { Customer_id, first_name, last_name, email, phone_number, address, city, Customer_Password } = user;
 
    // Dispatch the customer data to Redux
    dispatch(
       addCustomers({
        Customerid: Customer_id,
        firstName: first_name,
        lastName: last_name,
        email,
        phoneNumber: phone_number,
        address,
        city,
        Customer_Password,
      })
    );

    // Reset the form state
    setUser({
      Customer_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address: "",
      city: "",
      Customer_Password: "",
    });
  };

  return (
    <div className="bg-white border rounded-lg shadow-md w-full max-w-md mx-auto mt-16">
      {/* Sign up Form */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {["Customer_id","first_name", "last_name", "email", "phone_number", "address", "city", "Customer_Password"].map((field) => (
            <motion.div key={field} className="bg-white p-4 rounded-lg shadow-sm space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium capitalize">{field.replace("_", " ")}</label>
                <input
                  type="text"
                  name={field}
                  value={user[field]}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
            </motion.div>
          ))}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
