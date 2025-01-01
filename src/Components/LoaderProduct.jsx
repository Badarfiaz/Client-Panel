import React from 'react';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/material';

const LoaderProduct = () => {
  // Number of skeletons to display
  const skeletonCount = 8;

  return (
    <div className="py-16">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] via-[#ffb3d9] to-[#9089fc] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] via-[#ffb3d9] to-[#9089fc] opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Box className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8B3C5E] to-[#FFB6C1]">
            Our Collection
          </h1>
        </Box>

        {/* Grid layout for skeletons matching the product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-transform flex flex-col"
            >
              {/* Image Skeleton */}
              <div className="relative w-full overflow-hidden bg-gray-100 rounded-t-lg">
                <Skeleton variant="rectangular" width="100%" height="200px" />
              </div>

              {/* Content Skeleton */}
              <div className="p-4 flex flex-col flex-grow items-start">
                {/* Title Skeleton */}
                <Skeleton variant="text" width="80%" height="20px" className="mb-2" />

                {/* Price Skeleton */}
                <Skeleton variant="text" width="60%" height="20px" className="mb-2" />

                {/* Button Skeleton */}
                <div className="gap-2 mt-4 w-full flex">
                  <Skeleton variant="rectangular" width="50%" height="40px" className="rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoaderProduct;
