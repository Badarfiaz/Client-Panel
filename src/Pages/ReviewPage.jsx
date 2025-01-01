import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddReview, ReviewView } from "../Redux/AddReviewSlice";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import ReviewSkeletonLoader from '../Components/ReviewSkeletonLoader'

export default function CreateReview() {
  const [review, setReview] = useState({
    Product_id: "",
    Customer_id: "",
    Rating: "",
    Comment: "",
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const { Product_id, Customer_id, Rating, Comment } = review;

    dispatch(AddReview({ Product_id, Customer_id, Rating, Comment }));

    setReview({
      Product_id: "",
      Customer_id: "",
      Rating: "",
      Comment: "",
    });
  };

  if (loading) {
    return  <ReviewSkeletonLoader/>;
  }

  if (error) {
    return <div className="text-center text-xl font-semibold text-red-500">Error: {error}</div>;
  }

  // Animation variants for staggered effect
  const reviewVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="max-w-screen-lg mx-auto p-8  rounded-lg shadow-xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3, // Stagger effect applied here
            },
          },
        }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Customer Reviews Section */}
        <div>
          <Typography variant="h4" component="h2" className="text-gray-800 mb-8 font-semibold ">
            Customer Reviews
          </Typography>
          <div className="space-y-8">
            {Views && Views.length > 0 ? (
              Views.map((review, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  variants={reviewVariants} // Apply staggered animation to each card
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={review.product_image}
                    alt={review.product_name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <Typography variant="h6" className="text-gray-800 font-semibold">{review.Customer_Name}</Typography>
                    <Typography variant="body2" className="text-gray-600 mt-1">{review.product_name}</Typography>
                    <div className="flex items-center space-x-2 mt-3">
                      <span className="text-yellow-500">{'⭐'.repeat(review.review_rating)}</span>
                      <Typography variant="body2" className="text-gray-700 font-medium">Rating: {review.review_rating}/5</Typography>
                    </div>
                    <Typography variant="body1" className="text-gray-700 mt-3">{review.review_comment}</Typography>
                    <Typography variant="body2" className="text-gray-500 text-xs mt-2">
                      Reviewed on: {new Date(review.review_date).toLocaleDateString()}
                    </Typography>
                  </div>
                </motion.div>
              ))
            ) : (
              <Typography variant="body1" className="text-center text-gray-500">No reviews available.</Typography>
            )}
          </div>
        </div>

        {/* Submit Review Form */}
        <div>
          <Typography variant="h4" component="h2" className="text-gray-800 mb-8 font-semibold">
            Submit a Review
          </Typography>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {["Product_id", "Customer_id", "Rating", "Comment"].map((field) => (
              <motion.div key={field} className="space-y-4">
                <Typography variant="body1" className="text-gray-700">
                  {field.replace("_", " ")}
                </Typography>
                <TextField
                  id={field}
                  name={field}
                  value={review[field]}
                  onChange={handleInputChange}
                  required
                  label={field.replace("_", " ")}
                  variant="outlined"
                  fullWidth
                  type={field === "Rating" ? "number" : "text"}
                  inputProps={field === "Rating" ? { min: 1, max: 5 } : {}}
                  sx={{ marginBottom: 3 }}
                />
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="w-full py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Review
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
