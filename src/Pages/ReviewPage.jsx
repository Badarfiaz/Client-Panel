'use client'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddReview, ReviewView } from "../Redux/AddReviewSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, TextField, Rating, Snackbar } from "@mui/material";
import { Star } from 'lucide-react';

export default function CreateReview() {
  const [review, setReview] = useState({
    Product_id: "",
    Customer_id: "",
    Rating: 0,
    Comment: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const dispatch = useDispatch();
  const { Views, loading, error } = useSelector((state) => state.Review);

  useEffect(() => {
    dispatch(ReviewView());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setReview((prevReview) => ({
      ...prevReview,
      Rating: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { Product_id, Customer_id, Rating, Comment } = review;

    dispatch(AddReview({ Product_id, Customer_id, Rating, Comment }));

    setReview({
      Product_id: "",
      Customer_id: "",
      Rating: 0,
      Comment: "",
    });

    setSnackbar({ open: true, message: "Review submitted successfully!" });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl">
          <Typography variant="h5" className="text-red-500 mb-4">
            Error: {error}
          </Typography>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 bg-gradient-to-br from-pink-500 to-purple-600">
              <Typography variant="h3" className="text-white mb-8 font-bold">
                Customer Reviews
              </Typography>
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              <AnimatePresence>
  {Views && Views.length > 0 ? (
    Views.map((review, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          delay: index * 0.1, // Staggered animation
        }}
        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex items-start space-x-4">
          <img
            src={review.product_image || "/placeholder.svg"}
            alt={review.product_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <Typography variant="h6" className="text-gray-800 font-semibold">
              {review.Customer_Name}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              {review.product_name}
            </Typography>
            <div className="flex items-center mt-2">
              <Rating
                value={review.review_rating}
                readOnly
                size="small"
                icon={<Star className="text-yellow-400" />}
                emptyIcon={<Star className="text-gray-300" />}
              />
              <Typography variant="body2" className="ml-2 text-gray-600">
                {review.review_rating}/5
              </Typography>
            </div>
            <Typography variant="body2" className="text-gray-700 mt-2">
              {review.review_comment}
            </Typography>
            <Typography variant="caption" className="text-gray-500 mt-2 block">
              Reviewed on: {new Date(review.review_date).toLocaleDateString()}
            </Typography>
          </div>
        </div>
      </motion.div>
    ))
  ) : (
    <Typography variant="body1" className="text-center text-white">
      No reviews available.
    </Typography>
  )}
</AnimatePresence>

              </div>
            </div>
            
            <div className="p-8 lg:p-12">
              <Typography variant="h3" className="text-gray-800 mb-8 font-bold">
                Submit a Review
              </Typography>
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                {["Product_id", "Customer_id"].map((field) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TextField
                      id={field}
                      name={field}
                      value={review[field]}
                      onChange={handleInputChange}
                      required
                      label={field.replace("_", " ")}
                      variant="outlined"
                      fullWidth
                      className="bg-gray-50"
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography component="legend" className="text-gray-700 mb-2">
                    Rating
                  </Typography>
                  <Rating
                    name="Rating"
                    value={review.Rating}
                    onChange={handleRatingChange}
                    icon={<Star className="text-yellow-400" />}
                    emptyIcon={<Star className="text-gray-300" />}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TextField
                    id="Comment"
                    name="Comment"
                    value={review.Comment}
                    onChange={handleInputChange}
                    required
                    label="Comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    className="bg-gray-50"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-md hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Review
                </motion.button>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}

