import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../Redux/ProductsSlice";
import { addProduct } from "../Redux/AddToCart";
import { Button } from "@headlessui/react";
import { Box } from "@mui/material";
import LoaderProduct from "../Components/LoaderProduct";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  const handleCart = (product) => {
    dispatch(addProduct(product));
  };

  if (loading) {
    return  <div className="flex justify-center items-center h-screen bg-gray-100"
        
        >
          <motion.div
            className="w-16 h-16 border-t-4 border-[#8B3C5E] border-solid rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="py-16"
      style={{
        backgroundImage: `url("/pro.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Box className="text-center mb-8">
          <motion.h1
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8B3C5E] to-[#FFB6C1]"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            Our Collection
          </motion.h1>
        </Box>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products && products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  className="group bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="relative w-full overflow-hidden bg-gray-100 rounded-t-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      alt={product.Description || "Product Image"}
                      src={product.img || "/fallback-image.jpg"}
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                      className="w-full h-48 object-cover object-center"
                      style={{ height: "200px" }}
                    />
                  </motion.div>
                  <div className="p-4 flex flex-col flex-grow items-start">
                    <motion.h3
                      className="text-base font-semibold text-gray-800"
                      whileHover={{ color: "#F2BED1" }}
                    >
                      Item: <span>{product.Title}</span>
                    </motion.h3>
                    <h3 className="text-base font-semibold text-gray-800">
                      Pkr {product.Price}
                    </h3>
                  </div>
                  <motion.button
                    onClick={() => handleCart(product)}
                    className="bg-[#F2BED1] hover:bg-[#8B3C5E] text-white font-medium m-1 p-2 rounded-md shadow-sm transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-gray-500 text-center col-span-full"
                variants={itemVariants}
              >
                No products available.
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AllProducts;

