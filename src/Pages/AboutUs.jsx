'use client'

import React from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
 
const AboutUs = () => {
  const Navigate = useNavigate();

  const handleContactBtn = () => {
    Navigate("/Contactus");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      className="bg-[#F9F5F6] min-h-screen p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-[#8B3C5E] mb-8"
        variants={itemVariants}
      >
        About us
      </motion.h1>
      <div className="max-w-4xl mx-auto text-center">
        <motion.p className="text-lg text-gray-700 mb-6" variants={itemVariants}>
          Welcome to our handcrafted jewelry store, where every piece tells a
          story! At [Brand Name], we believe in the magic of unique designs
          that reflect the beauty and individuality of each person. Our
          collections feature an array of necklaces, bracelets, earrings, and
          custom orders, meticulously crafted to perfection.
        </motion.p>
        <motion.p className="text-lg text-gray-700 mb-6" variants={itemVariants}>
          Founded with a passion for creativity and elegance, our mission is to
          provide stunning jewelry that complements every style and occasion.
          Whether you're looking for a statement piece or a delicate charm, we
          have something special for you.
        </motion.p>
        <motion.p className="text-lg text-gray-700 mb-8" variants={itemVariants}>
          Connect with us on social media or reach out directly for any
          inquiries or custom orders. Let's create something beautiful together!
        </motion.p>
         <motion.button
          onClick={handleContactBtn}
          className="bg-[#FDCEDF] text-[#8B3C5E] py-2 px-4 rounded-lg hover:bg-[#F2BED1] transition-colors duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AboutUs;

