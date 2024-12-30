import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, updateQuantity, UpdateTotalWithDelivery } from "../Redux/AddToCart";
import { Link, useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, cartTotal } = useSelector((state) => state.cart);

  const [deliveryCity, setDeliveryCity] = useState(0);
  const [deliveryOut, setDeliveryOut] = useState(0);
  const [deliveryError, setDeliveryError] = useState(false);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveProduct(productId);
    } else {
      dispatch(updateQuantity({ id: productId, quantity }));
    }
  };

  const handleDelivery = (delivery) => {
    setDeliveryError(false);
    if (delivery === 300) {
      setDeliveryOut(300);
      setDeliveryCity(0);
    } else {
      setDeliveryCity(200);
      setDeliveryOut(0);
    }
    dispatch(UpdateTotalWithDelivery(delivery));
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handlePayment = () => {
    if (deliveryCity > 0 || deliveryOut > 0) {
      navigate('/ordermain');
    } else {
      setDeliveryError(true);
    }
  };

  return (
    <div className="bg-[#F9F5F6] min-h-screen p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#8B3C5E] mb-6 sm:mb-8">Checkout</h1>
      <div className="container mx-auto max-w-5xl bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#8B3C5E] mb-4">Your Cart</h2>
        <ul className="space-y-4">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            products.map((product) => (
              <li key={product.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center mb-4 md:mb-0">
                  <img src={product.img} alt={product.Title} className="w-20 h-20 object-cover rounded-lg mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#8B3C5E]">{product.Title}</h3>
                    <p className="text-gray-600 text-base">PKR {product.Price}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <button
                      onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                      className="bg-[#FDCEDF] text-[#8B3C5E] px-3 py-1 rounded-full mr-2 hover:bg-[#F2BED1] transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg mx-2">{product.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                      className="bg-[#FDCEDF] text-[#8B3C5E] px-3 py-1 rounded-full ml-2 hover:bg-[#F2BED1] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-semibold text-[#8B3C5E] mb-4">Shipping </h3>
          <div className="flex flex-col sm:flex-row items-center">
            <button
              onClick={() => handleDelivery(200)}
              className={`px-4 py-2 rounded-lg mb-2 sm:mb-0 sm:mr-4 ${deliveryCity ? 'bg-[#8B3C5E]' : 'bg-[#FDCEDF]'} text-white`}
            >
              Lahore Delivery ( PKR 200)
            </button>
            <button
              onClick={() => handleDelivery(300)}
              className={`px-4 py-2 rounded-lg ${deliveryOut ? 'bg-[#8B3C5E]' : 'bg-[#FDCEDF]'} text-white`}
            >
              Out of Lahore Delivery ( PKR 300)
            </button>
          </div>
          {deliveryError && (
            <p className="text-red-600 mt-2 text-center">Please select a delivery option before proceeding.</p>
          )}
        </div>


        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <span className="text-lg sm:text-xl font-semibold text-[#8B3C5E]">Total: PKR {cartTotal}</span>
          <button
            onClick={handlePayment}
            className="bg-[#8B3C5E] text-white px-4 py-2 rounded-lg hover:bg-[#F2BED1] transition-colors"
          >
            Proceed to Payment
          </button>
        </div>


      </div>
    </div>
  );
};