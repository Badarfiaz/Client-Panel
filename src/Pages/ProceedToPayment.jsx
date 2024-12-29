import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, updateQuantity } from "../Redux/AddToCart";
import { addCustomers } from "../Redux/CustomerSlice";
import { motion } from "framer-motion";
 import Paymentmethod from "./Paymentmethod";

export default function OrderReviewDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { products, cartTotal } = useSelector((state) => state.cart);

  const [items, setItems] = useState([
    { first_name: "", last_name: "", email: "", phone_number: "", address: "", city: "" },
  ]);

  const dispatch = useDispatch();
 
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    items.forEach((item) => {
      const { first_name, last_name, email, phone_number, address, city } = item;
      dispatch(
        addCustomers({
          firstName: first_name,
          lastName: last_name,
          email,
          phoneNumber: phone_number,
          address,
          city,
        })
      );
    });

    setItems([
      { first_name: "", last_name: "", email: "", phone_number: "", address: "", city: "" },
    ]);

    

   };

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveProduct(productId);
    } else {
      dispatch(updateQuantity({ id: productId, quantity }));
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-md w-full max-w-md mx-auto mt-16">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-gray-900 font-medium bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-t-lg"
      >
        <span>Order Summary</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-3">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 py-3 border-b">
                  <img
                    src={product.img}
                    alt={product.Title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.Title}</p>
                    <p className="text-sm text-gray-500">{product.Description}</p>
                    <p className="text-gray-900">{product.Price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      -
                    </button>
                    <p className="text-gray-900">{product.quantity}</p>
                    <button
                      onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="py-4 border-t">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{`PKR ${cartTotal.toFixed(2)}`}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p>Shipping</p>
                  <p>FREE</p>
                </div>
                <div className="flex justify-between font-medium mt-4 border-t pt-2">
                  <p>Total</p>
                  <p>{`PKR ${cartTotal.toFixed(2)}`}</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Delivery Form */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Delivery Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm space-y-4"
            >
              {["first_name", "last_name", "email", "phone_number", "address", "city"].map((field) => (
                <div key={field} className="space-y-2">
                  <label className="text-sm font-medium capitalize">{field.replace("_", " ")}</label>
                  <input
                    type="text"
                    name={field}
                    value={item[field]}
                    onChange={(event) => handleInputChange(index, event)}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
              ))}
            </motion.div>
          ))}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </button>

</form>
          
      </div>
      {/* Payment-method Form */}


<div>
<Paymentmethod  />


</div>






    </div>
  );
}
