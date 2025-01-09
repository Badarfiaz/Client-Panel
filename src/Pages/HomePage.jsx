import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProductsData } from '../Redux/ProductsSlice';
import BentoGrid from '../Components/Bentogrid';
import FeaturedProducts from '../Components/FeaturedProducts';
import HeroSection from '../Components/HeroSection';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );  }

  if (error) {
    return <div className="text-center text-2xl text-red-600">Error: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100"
    >
      <HeroSection />
      <BentoGrid products={products.slice(0, 5)} />
      <FeaturedProducts products={products.slice(5, 9)} />
    </motion.div>
  );
};

export default HomePage;
