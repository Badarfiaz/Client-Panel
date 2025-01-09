'use client';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomers } from "../Redux/CustomerSlice";
import { AddOrders } from "../Redux/OrderSlice";
import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, Truck, User, MapPin, Phone, Mail, Lock } from 'lucide-react';
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

export default function OrderForm() {
  const { products, cartTotal } = useSelector((state) => state.cart);
  const [customerDetails, setCustomerDetails] = useState({
    Customer_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    Customer_Password: "",
  });

  const [items, setItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const productItems = products.map((product) => ({
      Product_id: product.id,
      quantity: product.quantity,
    }));
    setItems(productItems);
  }, [products]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleFormSubmit = () => {
    const { Customer_id, first_name, last_name, email, phone_number, address, city, Customer_Password } = customerDetails;

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
  };

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method!");
      return;
    }

    items.forEach((item) => {
      dispatch(
        AddOrders({
          Customer_id: customerDetails.Customer_id,
          Product_id: item.Product_id,
          quantity: item.quantity,
          total_amount: cartTotal,
          payment_method: paymentMethod,
          order_status: "Pending",
        })
      );
    });

    toast.success("Your order has been successfully dispatched!", {
      icon: <Truck className="h-4 w-4" />,
    });

    setPaymentMethod("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit();
    handlePaymentSubmit();

    setCustomerDetails({
      Customer_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address: "",
      city: "",
      Customer_Password: "",
    });
    setItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-center text-pink-800 mb-12">Complete Your Order</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 border border-pink-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-pink-700 flex items-center">
              <ShoppingCart className="mr-2 text-pink-500" /> Order Summary
            </h2>
            {products.length === 0 ? (
              <p className="text-gray-500">No items in the order.</p>
            ) : (
              <ul className="space-y-4">
                {products.map((product) => (
                  <motion.li
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-4 border-b border-pink-100 pb-4"
                  >
                    <img
                      src={product.img}
                      alt={product.Title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-pink-700">{product.Title}</h3>
                      <p className="text-pink-600">PKR {product.Price}</p>
                    </div>
                    <div className="text-pink-600">Quantity: {product.quantity}</div>
                  </motion.li>
                ))}
              </ul>
            )}
            <div className="mt-6 text-2xl font-bold text-pink-800">Total: PKR {cartTotal}</div>
          </motion.div>

          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 border border-pink-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-pink-700">Order Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-pink-600">Customer Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(customerDetails).map(([field, value]) => (
                  <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-pink-700 mb-1">
                    {field.replace("_", " ")}
                  </label>
                  <div className="relative">
                    <input
                      id={field}
                      name={field}
                      value={value}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-pink-300 rounded-md shadow-sm p-2 pl-8 focus:ring-2 focus:ring-pink-500 focus:border-purple-300 focus:outline-none"
                    />
                    {field.includes('name') && <User className="absolute left-2 top-3 h-4 w-4 text-pink-400" />}
                    {field.includes('email') && <Mail className="absolute left-2 top-3 h-4 w-4 text-pink-400" />}
                    {field.includes('phone') && <Phone className="absolute left-2 top-3 h-4 w-4 text-pink-400" />}
                    {field.includes('address') && <MapPin className="absolute left-2 top-3 h-4 w-4 text-pink-400" />}
                    {field.includes('Password') && <Lock className="absolute left-2 top-3 h-4 w-4 text-pink-400" />}
                  </div>
                </div>
                                 ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-pink-600">Payment Method</h3>
                <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange} className="space-y-2">
                  {["COD", "Bank", "Jazz Cash"].map((method) => (
                    <FormControlLabel
                      key={method}
                      value={method}
                      control={<Radio sx={{ color: '#EC4899', '&.Mui-checked': { color: '#EC4899' } }} />}
                      label={method}
                      className="text-pink-700"
                    />
                  ))}
                </RadioGroup>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-pink-600 hover:to-purple-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              >
                <CreditCard className="mr-2 inline-block" /> Place Order
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

