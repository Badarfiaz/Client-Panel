import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Home, ShoppingBag, Info, Phone, Star, MessageSquare, Menu, X, ShoppingCart } from 'lucide-react'
import { Badge } from 'lucide-react'
import { Button } from '@headlessui/react'
import CartSidePage from './CartSideBar'

const navItems = [
  { name: 'Dashboard', to: '/', icon: Home },
  { name: 'Products', to: '/Productpage', icon: ShoppingBag },
  { name: 'About Us', to: '/Aboutus', icon: Info },
  { name: 'Contact', to: '/Contactus', icon: Phone },
  { name: 'Reviews', to: '/review', icon: Star },
  { name: 'Complaints', to: '/Complaints', icon: MessageSquare },
]

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false)
  const { TotalItems = 0, products = [] } = useSelector((state) => state.cart);

  const handleCartSidebarToggle = () => setIsCartSidebarOpen(!isCartSidebarOpen)
  const handleCartSidebarClose = () => setIsCartSidebarOpen(false)

  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-100 to-purple-100 py-4 px-6 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <motion.span 
            className="text-3xl font-bold text-pink-600 hover:text-pink-700 transition-colors duration-300"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EnchantByReem
          </motion.span>
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <Link key={item.name} to={item.to}>
              <motion.span 
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5 mr-1" />
                {item.name}
              </motion.span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCartSidebarToggle}
            className="relative text-pink-600 hover:text-pink-700 transition-colors duration-300"
          >
            <ShoppingCart className="h-6 w-6" />
            <Badge badgecontent={TotalItems} variant="destructive" className="absolute -top-2 -right-2">
              {TotalItems}
            </Badge>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-pink-600 hover:text-pink-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform md:hidden z-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <span className="text-2xl font-bold text-pink-600">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="text-pink-600 hover:text-pink-700"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <motion.div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link to={item.to}>
                    <motion.span 
                      className="text-pink-600 hover:text-pink-700 font-medium transition-colors duration-300 flex items-center"
                      onClick={() => setIsSidebarOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      {item.name}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartSidePage
        isOpen={isCartSidebarOpen}
        onClose={handleCartSidebarClose}
      />
    </nav>
  )
}

export default NavBar
