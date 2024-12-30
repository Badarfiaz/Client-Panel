import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomers } from "../Redux/CustomerSlice";
import { AddOrders } from "../Redux/OrderSlice";
import { motion } from "framer-motion";

export default function OrderMainPage() {
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
  const [paymentMethod, setPaymentMethod] = useState([]);
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

  const handleQuantityChange = (index, event) => {
    const { value } = event.target;
    const updatedItems = [...items];
    updatedItems[index].quantity = parseInt(value, 10) || 1;
    setItems(updatedItems);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setPaymentMethod((prevMethods) =>
      checked
        ? [...prevMethods, value]
        : prevMethods.filter((method) => method !== value)
    );
  };

  const handleformSubmit = () => {
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
    if (paymentMethod.length === 0) {
      alert("Please select a payment method!");
      return;
    }

    items.forEach((item) => {
      dispatch(
        AddOrders({
          Customer_id: customerDetails.Customer_id,
          Product_id: item.Product_id,
          quantity: item.quantity,
          total_amount: cartTotal,
          payment_method: paymentMethod.join(", "),
          order_status: "Pending",
        })
      );
    });

    setPaymentMethod([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleformSubmit();
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
    <div className="bg-gradient-to-r from-fuchsia-100 to-pink-50 min-h-screen p-6">
      
      <div className="max-w-4xl bg-white mx-auto p-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-pink-600 mb-8">Order Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div 
            initial={{ opacity: 0 }} 
            className="bg-gray-50 p-4 rounded-lg shadow-sm border border-[#F2BED1] space-y-4"

            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-medium text-pink-500">Customer Details</h3>
            {["Customer_id", "first_name", "last_name", "email", "phone_number", "address", "city", "Customer_Password"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-lg font-medium text-gray-700">{field.replace("_", " ")}</label>
                <input
                  type="text"
                  name={field}
                  value={customerDetails[field]}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-gray-50 p-4 rounded-lg shadow-sm border border-[#F2BED1] space-y-4"

            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-medium text-pink-500">Order Details</h3>
            {items.map((item, index) => (
              <motion.div key={item.Product_id} className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Quantity for Product {item.Product_id}</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e)}
                  min="1"
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-gray-50 p-4 rounded-lg shadow-sm border border-[#F2BED1] space-y-4"

            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-medium text-pink-500">Payment Method</h3>
            <div className="space-y-2">
              {["COD", "Bank", "Jazz Cash"].map((method) => (
                <label key={method} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={method}
                    checked={paymentMethod.includes(method)}
                    onChange={handleCheckboxChange}
                    className="text-pink-500 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="text-lg">{method}</span>
                </label>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button type="submit" className="w-full py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-700 transition-colors duration-300">
              Submit Order
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
