'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { Home, ShoppingBag, Info, Phone, Star, MessageSquare } from 'lucide-react';




const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pink-50 text-pink-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">EnchantByReem</h2>
            <p className="text-pink-600">
              Discover the magic of enchanting fashion and accessories.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="hover:text-pink-500 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/Productpage" className="hover:text-pink-500 transition-colors flex items-center">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Products
            </Link>
          </li>
          <li>
            <Link to="/Aboutus" className="hover:text-pink-500 transition-colors flex items-center">
              <Info className="w-4 h-4 mr-2" />
              About Us
            </Link>
          </li>
          <li>
            <Link to="/Contactus" className="hover:text-pink-500 transition-colors flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Link>
          </li>
          <li>
            <Link to="/review" className="hover:text-pink-500 transition-colors flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Reviews
            </Link>
          </li>
          <li>
            <Link to="/Complaints" className="hover:text-pink-500 transition-colors flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Complaints
            </Link>
          </li>
        </ul></motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/EnchantByReem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-500 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com/EnchantByReem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-500 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com/EnchantByReem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-500 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white text-pink-800 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 pt-8 border-t border-pink-200 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-sm text-pink-600">
            &copy; {currentYear} EnchantByReem. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

