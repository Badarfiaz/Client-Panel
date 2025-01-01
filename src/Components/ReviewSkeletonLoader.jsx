import React from "react";
import { Skeleton } from "@mui/material";

export default function ReviewSkeletonLoader() {
  return (
    <div className="max-w-screen-lg mx-auto p-8 rounded-lg shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Customer Reviews Skeleton Section */}
        <div>
          <Skeleton variant="text" width="60%" height={40} />
          <div className="space-y-8 mt-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-start space-x-6 p-6 bg-white rounded-xl shadow-lg transition-all duration-300"
              >
                <Skeleton variant="circular" width={80} height={80} />
                <div className="flex-1 space-y-4">
                  <Skeleton variant="text" width="50%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="rectangular" width="60%" height={20} />
                  <Skeleton variant="text" width="70%" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Review Skeleton Form */}
        <div>
          <Skeleton variant="text" width="60%" height={40} />
          <div className="space-y-8 mt-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="rectangular" width="100%" height={56} />
              </div>
            ))}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={56}
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
