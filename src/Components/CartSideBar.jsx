'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { removeProduct, updateQuantity } from '../Redux/AddToCart';
import { useNavigate } from 'react-router-dom';
const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { products = [], TotalItems = 0, cartTotal = 0 } = useSelector((state) => state.cart);
const navigate = useNavigate();
const handleClick = ()=>{
  onClose(true) ;
  navigate('/Checkout')

}
  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={sidebarVariants}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <ShoppingBag className="h-6 w-6 mr-2" />
              Your Cart ({TotalItems})
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-grow px-6 py-4 overflow-y-auto">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-16 w-16 mb-4" />
                <p className="text-xl font-medium">Your cart is empty</p>
              </div>
            ) : (
              <motion.div className="space-y-6">
                {products.map((product) => (
                  <motion.div key={product.id} variants={itemVariants} className="flex items-center space-x-4">
                    <img src={product.img} alt={product.Title} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{product.Title}</h3>
                      <p className="text-gray-600">PKR {product.Price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                          className="border border-gray-300 rounded-full p-2 mr-2 disabled:opacity-50"
                          disabled={product.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-2 font-medium">{product.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                          className="border border-gray-300 rounded-full p-2"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">PKR {cartTotal.toFixed(2)}</span>
            </div>
            <div className="my-4 border-t border-gray-200" />
            <button onClick={handleClick}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md flex justify-center items-center"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
