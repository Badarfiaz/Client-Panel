import React from 'react';
import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <motion.section
      className="mb-16 bg-pink-50 rounded-lg p-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-red-600 mb-4">Our Story</h2>
      <p className="text-red-500 mb-4">
        Enchant By Reem was born from a passion for creating unique, handcrafted jewelry that tells a story. Each piece is meticulously designed and crafted to bring out the beauty in every wearer.
      </p>
      <motion.button
        className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all"
      >
        Learn More
      </motion.button>
    </motion.section>
  );
};

export default BrandStory;
