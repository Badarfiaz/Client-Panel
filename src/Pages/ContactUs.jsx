'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Phone, InstagramIcon as TiktokIcon } from 'lucide-react';

const ContactUs = () => {
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

  const iconVariants = {
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="bg-[#F9F5F6] min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8B3C5E] to-[#FFB6C1]">
          Contact Us
        </h1>
      </motion.div>

      <motion.p 
        className="text-gray-700 text-base sm:text-lg lg:text-xl text-center max-w-2xl mb-8"
        variants={itemVariants}
      >
        We'd love to hear from you! Whether you have a question, need assistance, or want to discuss a custom jewelry order, feel free to reach out.
      </motion.p>

      {/* Contact Details */}
      <motion.div 
        className="flex flex-wrap justify-center gap-6 mb-8"
        variants={itemVariants}
      >
        <motion.a
          href="mailto:reemfiaz344@icloud.com"
          className="text-[#8B3C5E] hover:text-[#F2BED1] transition-colors duration-300"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Email"
        >
          <Mail size={32} />
        </motion.a>
        <motion.a
          href="https://www.tiktok.com/@enchantbyreem?_op=1&_r=1&_t=8dDQZ6xkBIw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8B3C5E] hover:text-[#F2BED1] transition-colors duration-300"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="TikTok"
        >
          <TiktokIcon size={32} />
        </motion.a>
        <motion.a
          href="https://wa.me/03344444503"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8B3C5E] hover:text-[#F2BED1] transition-colors duration-300"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="WhatsApp"
        >
          <Phone size={32} />
        </motion.a>
      </motion.div>

      {/* Additional Section */}
      <motion.div className="text-center mt-8" variants={itemVariants}>
        <motion.h2 
          className="text-[#8B3C5E] font-bold mb-2 text-xl sm:text-2xl"
          variants={itemVariants}
        >
          Follow Us
        </motion.h2>
        <motion.p 
          className="text-gray-700 text-sm sm:text-base lg:text-lg max-w-2xl"
          variants={itemVariants}
        >
          Stay connected and follow us on social media for the latest updates and promotions.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default ContactUs;

