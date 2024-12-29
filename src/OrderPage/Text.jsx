import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddOrders } from "../Redux/OrderSlice";

export default function InsertOrders() {
  const [orderDetails, setOrderDetails] = useState({
    Customer_id: "",
    Product_id: "",
    quantity: "",
    total_amount: "",
    order_status: "",
    payment_method: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate fields
  
 

    // Dispatch order details to Redux
    dispatch(AddOrders(orderDetails));
    alert("Order inserted successfully!");

    // Reset form
    setOrderDetails({
      Customer_id: "",
      Product_id: "",
      quantity: "",
      total_amount: "",
      order_status: "",
      payment_method: "",
    });
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Insert Orders Manually</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["Customer_id", "Product_id", "quantity", "total_amount", "order_status", "payment_method"].map((field) => (
          <div key={field}>
            <label className="block text-lg font-medium mb-2">{field.replace("_", " ")}</label>
            <input
              type="text"
              name={field}
              value={orderDetails[field]}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder={`Enter ${field.replace("_", " ")}`}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
