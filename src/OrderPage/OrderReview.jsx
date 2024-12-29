import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, updateQuantity } from "../Redux/AddToCart";
import { Link } from "react-router-dom";
 
export default function OrderReview() {
  const { products, cartTotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Order Summary */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Cart</h3>
        </div>
        {products.length === 0 ? (
          <p className="text-center text-gray-500 py-6">Your cart is empty.</p>
        ) : (
          <>
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-5 gap-4 items-center border-t py-4 px-6"
              >
                <img
                  src={product.img}
                  alt={product.Title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-gray-900">{product.Title}</p>
                  <p className="text-sm text-gray-500">{product.Description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                    className="px-2 py-1 border rounded-md text-sm bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <p className="text-sm text-gray-900">{product.quantity}</p>
                  <button
                    onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                    className="px-2 py-1 border rounded-md text-sm bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-sm font-semibold text-gray-900 text-right">PKR {product.Price}</p>
              </div>
            ))}
            <div className="border-t py-4 px-6">
              <div className="flex justify-between text-sm">
                <p>Subtotal</p>
                <p>PKR {cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <p>Shipping</p>
                <p>FREE</p>
              </div>
              <div className="flex justify-between text-sm font-medium mt-4">
                <p>Total</p>
                <p>PKR {cartTotal.toFixed(2)}</p>
              </div>
              <div className="mt-4">
                <Link
                to={'/orderMain'}
                  className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
 
    </div>
  );
}
