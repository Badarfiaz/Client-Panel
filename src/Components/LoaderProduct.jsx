import React from "react";
import { motion } from "framer-motion";

const LoaderProduct = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100"
    
    >
      <motion.div
        className="w-16 h-16 border-t-4 border-[#8B3C5E] border-solid rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoaderProduct;

