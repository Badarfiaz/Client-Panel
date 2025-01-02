import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BentoGrid = ({ products }) => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // Shuffle the products and select the first 5
    const shuffled = [...products].sort(() => 0.5 - Math.random()).slice(0, 5);
    setRandomProducts(shuffled);
  }, [products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-16 px-4"
    >
      <h2 className="text-3xl font-bold text-center text-pink-800 mb-12">Featured Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="col-span-2 row-span-2 bg-pink-300 rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src={randomProducts[0]?.img}
            alt={randomProducts[0]?.Title}
            className="w-full h-full object-cover lg:object-contain "
          />
        </motion.div>
        {randomProducts.slice(1).map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            className="bg-red-200 rounded-3xl overflow-hidden shadow-lg"
          >
            <img
              src={product.img}
              alt={product.Title}
              className="w-full h-48 object-cover "
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-pink-800">{product.Title}</h3>
              <p className="text-red-600">${parseFloat(product.Price).toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default BentoGrid;
