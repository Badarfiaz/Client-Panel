import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../Redux/ProductsSlice";
import { addProduct } from "../Redux/AddToCart";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from 'react-hot-toast';
import ErrorMessage from "../Components/Errormsg";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  const handleCart = (product) => {
    dispatch(addProduct(product));
    toast.success(`${product.Title} added to cart!`, {
      style: {
        border: '1px solid #F9A8D4',
        padding: '16px',
        color: '#831843',
      },
      iconTheme: {
        primary: '#BE185D',
        secondary: '#FBCFE8',
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-8">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12 animate-fade-in-down">
        Our Exquisite Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2, // Staggered delay
                }}
                whileHover={{ y: -5 }}
              >
                <img
                  alt={product.Description || "Product Image"}
                  src={product.img || "/fallback-image.jpg"}
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-pink-700 mb-2">
                    {product.Title}
                  </h2>
                  <p className="text-purple-600 text-lg mb-4">PKR {product.Price}</p>
                  <button
                    onClick={() => handleCart(product)}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-2xl text-pink-700">No products available.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllProducts;
