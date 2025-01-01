import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomers } from "../Redux/CustomerSlice";
import { AddOrders } from "../Redux/OrderSlice";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
 

  const handleCheckboxChange = (event) => {
    setPaymentMethod(event.target.value);

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
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
        {products.length === 0 ? (
          <p className="text-gray-500">No items in the order.</p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <img
                    src={product.img}
                    alt={product.Title}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{product.Title}</h3>
                    <p className="text-gray-500">PKR {product.Price}</p>
                  </div>
                </div>
                <div className="text-gray-700">Quantity: {product.quantity}</div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 text-right font-bold text-lg">
          Total: PKR {cartTotal}
        </div>
      </motion.div>

      {/* Order Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Order Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
            <Box
              component="div"
              sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}
            >
              {Object.keys(customerDetails).map((field) => (
                <TextField
                  key={field}
                  id={field}
                  label={field.replace("_", " ")}
                  variant="outlined"
                  name={field}
                  value={customerDetails[field]}
                  onChange={handleInputChange}
                  fullWidth
                />
              ))}
            </Box>
          </div>
          <div>
  <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
  <div className="flex items-center space-x-4">
    {["COD", "Bank", "Jazz Cash"].map((method) => (
      <label
        key={method}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <input
          type="radio"
          name="paymentMethod"
          value={method}
          checked={paymentMethod === method}
          onChange={handleCheckboxChange}
          className="rounded border-gray-300 text-pink-500 focus:ring-pink-300"
        />
        <span>{method}</span>
      </label>
    ))}
  </div>
</div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            Submit Order
          </button>
        </form>
      </motion.div>
    </div>
  );
}
