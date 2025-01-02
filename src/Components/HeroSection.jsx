import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
    const navigate = useNavigate();
    const handleClick=()=>{
navigate('/Productpage');
    };
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-20 bg-gradient-to-r from-pink-200 to-red-200"
    >
      <h1 className="text-5xl font-bold text-pink-800 mb-4">EnchantByReem</h1>
      <p className="text-xl text-red-700 mb-8">Discover handcrafted elegance</p>
      <motion.button onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition duration-300"
      >
        Shop Now
      </motion.button>
    </motion.section>
  );
};

export default HeroSection;

