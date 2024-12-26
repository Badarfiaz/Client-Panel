import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomers } from '../Redux/CustomerSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const [items, setItems] = useState([
    { first_name: '', last_name: '', email: '', phone_number: '', address: '', city: '' },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting: ', items);

    items.forEach((item) => {
      const { first_name, last_name, email, phone_number, address, city } = item;
      dispatch(
        addCustomers({
          firstName: first_name,
          lastName: last_name,
          email,
          phoneNumber: phone_number,
          address,
          city,
        })
      );
    });

    setItems([
      { first_name: '', last_name: '', email: '', phone_number: '', address: '', city: '' },
    ]);

    navigate('/payment-method'); // Redirect to payment method page
  };

  return (
    <div className="py-16">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-4 sm:p-6 bg-[#F9F5F6] rounded-lg shadow-md"
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-[#F2BED1] space-y-4"
          >
            {/* First Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-[#333]">First Name</label>
              <input
                type="text"
                name="first_name"
                value={item.first_name}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-[#333]">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={item.last_name}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-[#333]">Email</label>
              <input
                type="email"
                name="email"
                value={item.email}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-[#333]">Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={item.phone_number}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Address */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-[#333]">Address</label>
              <input
                type="text"
                name="address"
                value={item.address}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
                placeholder="Enter address"
                required
              />
            </div>

            {/* City */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-[#333]">City</label>
              <input
                type="text"
                name="city"
                value={item.city}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
                placeholder="Enter city"
                required
              />
            </div>
          </motion.div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
