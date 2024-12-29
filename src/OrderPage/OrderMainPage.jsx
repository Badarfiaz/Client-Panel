import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomers } from "../Redux/CustomerSlice";
import { AddOrders } from "../Redux/OrderSlice";
import { motion } from "framer-motion";

export default function OrderMainPage() {
  const { products, cartTotal } = useSelector((state) => state.cart);
  const [customerDetails, setCustomerDetails] = useState({
    Customer_id: "",  // Manually input Customer ID
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
    // Dynamically populate the items with the products data
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
  };

  const handlePaymentSubmit = () => {
    if (paymentMethod.length === 0) {
      alert("Please select a payment method!");
      return;
    }

    items.forEach((item) => {
      dispatch(
        AddOrders({
          Customer_id: customerDetails.Customer_id, // Use the manually entered customer ID
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

    // Submit the form after setting the Customer ID
    handleformSubmit();
    handlePaymentSubmit();

    // Reset form fields after submission
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
    <div className="max-w-2xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-6">Order Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
 

        <h3 className="text-xl font-semibold mt-6">Customer Details</h3>

        {["Customer_id", "first_name", "last_name", "email" , "phone_number", "address", "city", "Customer_Password"].map(
          (field) => (
            <div key={field}>
              <label className="block text-lg font-medium mb-2">{field.replace("_", " ")}</label>
              <input
                type="text"
                name={field}
                value={customerDetails[field]}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          )
        )}

        <h3 className="text-xl font-semibold mt-6">Order Details</h3>
        {items.map((item, index) => (
          <motion.div key={item.Product_id} className="space-y-4">
            <label className="block text-lg font-medium mb-2">Quantity for Product {item.Product_id}</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(index, e)}
              className="w-full p-3 border border-gray-300 rounded-md"
              min="1"
              required
            />
          </motion.div>
        ))}

        <h3 className="text-xl font-semibold mt-6">Payment Method</h3>
        <div className="space-y-2">
          {["COD", "Bank", "Jazz Cash"].map((method) => (
            <label key={method} className="inline-flex items-center">
              <input
                type="checkbox"
                value={method}
                checked={paymentMethod.includes(method)}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="ml-2">{method}</span>
            </label>
          ))}
        </div>

        <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600">
          Submit
        </button>
      </form>
    </div>
  );
}
