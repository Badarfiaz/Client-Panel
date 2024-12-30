import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddReview, ReviewView } from "../Redux/AddReviewSlice"; // Assuming you have a Redux slice for reviews
import { motion } from "framer-motion";

export default function CreateReview() {
  const [review, setReview] = useState({
    Product_id: "",  // Product ID that is being reviewed
    Customer_id: "", // Customer ID who is submitting the review
    Rating: "",      // Rating given by the customer (1 to 5)
    Comment: "",     // Text comment for the review
  });

  const dispatch = useDispatch();
  const { Views, loading, error } = useSelector((state) => state.Review);

  // Fetch reviews when the component mounts
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

    // Dispatch the review data to Redux
    dispatch(
      AddReview({
        Product_id: Product_id,
        Customer_id: Customer_id,
        Rating: Rating,
        Comment: Comment,
      })
    );

    // Reset the form state
    setReview({
      Product_id: "",
      Customer_id: "",
      Rating: "",
      Comment: "",
    });
  };

  // Display loading or error messages
  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-semibold text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Two-column layout using flex */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Displaying existing Customer Reviews */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Customer Reviews</h2>

          <div className="space-y-6">
            {Views && Views.length > 0 ? (
              Views.map((review, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={review.product_image}
                    alt={review.product_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-700">{review.Customer_Name}</h3>
                    <p className="text-gray-500">{review.product_name}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">{'⭐'.repeat(review.review_rating)}</span>
                      <span className="text-gray-600">Rating: {review.review_rating}/5</span>
                    </div>
                    <p className="text-gray-600 mt-2">{review.review_comment}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Reviewed on: {new Date(review.review_date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">No reviews available.</p>
            )}
          </div>
        </div>

        {/* Review Form */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Submit a Review</h2>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {["Product_id", "Customer_id", "Rating", "Comment"].map((field) => (
              <motion.div key={field} className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  {field.replace("_", " ")}
                </label>
                <input
                  type={field === "Rating" ? "number" : "text"}  // For Rating, we use number input type
                  name={field}
                  value={review[field]}
                  onChange={handleInputChange}
                  required
                  min={field === "Rating" ? 1 : undefined}  // Set minimum value for Rating
                  max={field === "Rating" ? 5 : undefined}  // Set maximum value for Rating
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="w-full py-3 bg-pink-400 text-white rounded-lg shadow-md hover:bg-primary-600 focus:ring-2 focus:ring-primary-400 transition-all duration-200"
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
