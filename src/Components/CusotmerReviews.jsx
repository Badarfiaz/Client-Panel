import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReviewView } from '../Redux/AddReviewSlice';
import { motion } from 'framer-motion';

function CustomerReviews() {
  const dispatch = useDispatch();
  const { Views, loading, error } = useSelector((state) => state.Review);

  useEffect(() => {
    dispatch(ReviewView());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {Views && Views.length > 0 ? (
        Views.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-6 space-y-4"
          >
            <div className="flex items-start space-x-4">
              <img
                src={review.product_image}
                alt={review.product_name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {review.Customer_Name}
                </h3>
                <p className="text-gray-500 text-sm">{review.product_name}</p>

                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">
                    {'⭐'.repeat(review.review_rating)}
                  </span>
                  <span className="text-gray-600">Rating: {review.review_rating}/5</span>
                </div>

                <p className="text-gray-700">{review.review_comment}</p>
                <p className="text-sm text-gray-400">
                  Reviewed on: {new Date(review.review_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500">No reviews available.</p>
      )}
    </div>
  );
}

export default CustomerReviews;
