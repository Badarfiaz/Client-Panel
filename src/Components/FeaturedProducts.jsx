import React from 'react';
import { motion } from 'framer-motion';

const FeaturedProducts = ({ products }) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-red-100 to-pink-100">
      <h2 className="text-3xl font-bold text-center text-pink-800 mb-12">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <img src={product.img} alt={product.Title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-pink-800">{product.Title}</h3>
              <p className="text-red-600">${parseFloat(product.Price).toFixed(2)}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition duration-300"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
