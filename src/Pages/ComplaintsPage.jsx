import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Complaints } from '../Redux/AddComplaints';
import { motion, AnimatePresence } from 'framer-motion';
import { AddCircleOutline, Send } from '@mui/icons-material';

const ComplaintForm = () => {
  const [items, setItems] = useState([
    { Order_id: '', Customer_id: '', Complaint_text: '', Resolution_status: '' },
  ]);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    items.forEach((item) => {
      dispatch(
        Complaints({
          Order_id: parseInt(item.Order_id),
          Customer_id: parseInt(item.Customer_id),
          Complaint_text: item.Complaint_text || 'No description provided',
          Resolution_status: item.Resolution_status || 'Pending',
        })
      );
    });

    setItems([{ Order_id: '', Customer_id: '', Complaint_text: '', Resolution_status: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addComplaint = () => {
    setItems([...items, { Order_id: '', Customer_id: '', Complaint_text: '', Resolution_status: '' }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center font-playfair">
          Submit Your Complaints
        </h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-lg p-8">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg shadow-inner"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                    <input
                      type="number"
                      value={item.Order_id}
                      onChange={(e) => handleChange(index, 'Order_id', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
                    <input
                      type="number"
                      value={item.Customer_id}
                      onChange={(e) => handleChange(index, 'Customer_id', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Description</label>
                  <textarea
                    value={item.Complaint_text}
                    onChange={(e) => handleChange(index, 'Complaint_text', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 h-32 resize-none"
                    required
                  />
                </div>
                
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex justify-between items-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addComplaint}
              type="button"
              className="text-pink-600 hover:text-pink-700 focus:outline-none flex items-center"
            >
              <AddCircleOutline className="mr-2" />
              Add Another Complaint
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-md hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            >
              <span className="mr-2">Submit</span>
              <Send />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ComplaintForm;
