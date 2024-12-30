import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../Redux/ProductsSlice";
import { addProduct } from "../Redux/AddToCart";
 import { Button } from "@headlessui/react";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  const handleCart = (product) => {
    dispatch(addProduct(product));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

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
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Collection</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-transform flex flex-col"
              >
                <div className="relative w-full overflow-hidden bg-gray-100 rounded-t-lg">
                  <img
                    alt={product.Description || "Product Image"}
                    src={product.img || "/fallback-image.jpg"}
                    onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    className="w-full h-48 object-cover object-center"
                    style={{ height: "200px" }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow items-start">
                  <h3 className="text-base font-semibold text-gray-800">
                    Item: <span className="hover:text-[#F2BED1]">{product.Title}</span>
                  </h3>
                  <h3 className="text-base font-semibold text-gray-800">
                    Pkr {product.Price}
                  </h3>
                </div>
                <Button
                  onClick={() => handleCart(product)}
                  className="bg-[#F2BED1] hover:bg-[#8B3C5E] text-white font-medium m-1 p-2 rounded-md shadow-sm transition-colors duration-300"
                >
                  Add to Cart
                </Button>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center">No products available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
