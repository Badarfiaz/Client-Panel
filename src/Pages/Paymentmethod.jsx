import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddOrders } from "../Redux/OrderSlice";
import { motion } from "framer-motion";

export default function Paymentmethod() {
  const { products, cartTotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Initial state with empty data, will be populated with product information
  const [items, setItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]); // State for payment method
  const [totalAmount, setTotalAmount] = useState(cartTotal); // Store the total amount for all products
  const [customerId, setCustomerId] = useState(""); // Customer ID taken only once

  useEffect(() => {
    // Dynamically populate the items with the products data
    const productItems = products.map((product) => ({
      Order_id: "",
      Product_id: product.id,
      quantity: product.quantity, // Will be entered by user
      payment_method: [], // Initially empty, will be updated for all items
    }));
    setItems(productItems);
  }, [products, cartTotal]);

  const handleInputChange = (index, event) => {
    const { name, value, checked } = event.target;
    const newItems = [...items];

    if (name === "payment_method") {
      // Handle checkbox logic for payment method
      if (checked) {
        setPaymentMethod((prevMethods) => [...prevMethods, value]); // Add selected payment method
      } else {
        setPaymentMethod((prevMethods) =>
          prevMethods.filter((method) => method !== value)
        ); // Remove unselected payment method
      }
    } else {
      newItems[index][name] = value;
    }

    setItems(newItems);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting: ", items);
  
    items.forEach((item) => {
      const { Order_id, Product_id, quantity } = item;
  
      dispatch(
        AddOrders({
          Order_id: Order_id, 
          Customer_id: customerId, 
          Product_id: Product_id, 
          quantity: quantity, 
          total_amount: totalAmount, 
          payment_method: paymentMethod.join(", "), 
          order_status: "Pending", // Default value for order_status
        })
      );
    });
  
    // Reset the items, payment method, and customer ID state
    setItems([]);
    setPaymentMethod([]);
    setCustomerId(""); 
    setTotalAmount(0); 
  };
  
  return (
    <div className="bg-white border rounded-lg shadow-md w-full max-w-md mx-auto mt-16">
      <h2 className="text-2xl font-bold text-center mb-6">Delivery Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer ID (Only once for all products) */}
        <div className="space-y-2">
          <label className="text-sm font-medium capitalize">Customer ID</label>
          <input
            type="text"
            value={customerId}
            onChange={(event) => setCustomerId(event.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {items.map((item, index) => (
          <motion.div
            key={item.Product_id} // Use Product_id as the key for differentiation
            className="bg-white p-4 rounded-lg shadow-sm space-y-4"
          >
            {/* Order ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium capitalize">Order ID</label>
              <input
                type="text"
                name="Order_id"
                value={item.Order_id}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full border rounded-md p-2"
                required
              />
            </div>

            

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium capitalize">Quantity</label>
              <input
                type="number" // Change to number input for validation
                name="quantity"
                value={item.quantity}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </motion.div>
        ))}

        {/* Total Amount (Only Once) */}
        <div className="space-y-2">
          <label className="text-sm font-medium capitalize">Total Amount</label>
          <input
            type="text"
            value={totalAmount}
            onChange={(event) => setTotalAmount(event.target.value)}
            className="w-full border rounded-md p-2"
            readOnly // Total amount is calculated and set once for all products
            required
          />
        </div>

        {/* Payment Method - Checkboxes (No index needed here) */}
        <div className="space-y-2">
          <label className="text-sm font-medium capitalize">Payment Method</label>
          <div className="flex space-x-4">
            {/* COD */}
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="COD"
                checked={paymentMethod.includes("COD")}
                onChange={(event) => {
                  const { value, checked } = event.target;
                  setPaymentMethod((prevMethods) =>
                    checked
                      ? [...prevMethods, value]
                      : prevMethods.filter((method) => method !== value)
                  );
                }}
                className="form-checkbox"
              />
              <span className="ml-2">COD</span>
            </label>
            {/* Bank */}
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="Bank"
                checked={paymentMethod.includes("Bank")}
                onChange={(event) => {
                  const { value, checked } = event.target;
                  setPaymentMethod((prevMethods) =>
                    checked
                      ? [...prevMethods, value]
                      : prevMethods.filter((method) => method !== value)
                  );
                }}
                className="form-checkbox"
              />
              <span className="ml-2">Bank</span>
            </label>
            {/* Jazz Cash */}
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="Jazz Cash"
                checked={paymentMethod.includes("Jazz Cash")}
                onChange={(event) => {
                  const { value, checked } = event.target;
                  setPaymentMethod((prevMethods) =>
                    checked
                      ? [...prevMethods, value]
                      : prevMethods.filter((method) => method !== value)
                  );
                }}
                className="form-checkbox"
              />
              <span className="ml-2">Jazz Cash</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-green-600"
        >
          Payment
        </button>
      </form>
    </div>
  );
}
