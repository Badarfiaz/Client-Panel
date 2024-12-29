  "use client";

  import { useState } from "react";
  import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/react";
  import { XMarkIcon } from "@heroicons/react/24/outline";
  import { useSelector, useDispatch } from "react-redux";
  import {removeProduct , updateQuantity} from '../Redux/AddToCart'
  import { Link } from "react-router-dom";

  export default function CartSidePage() {
    const [open, setOpen] = useState(true);
    const { products, cartTotal } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveProduct = (productId) => {
      dispatch(removeProduct(productId));
    };

    const handleQuantityChange = (productId, quantity) => {
      if (quantity <= 0) {
        handleRemoveProduct(productId);
      } else {
        dispatch(updateQuantity({ id: productId, quantity }));
      }
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Dialog open={open} onClose={handleClose} className="relative z-50">
        <DialogBackdrop
          className={`fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity duration-300 ease-in-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 transform transition-transform duration-300 ease-in-out ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition-transform duration-300 ease-in-out bg-white shadow-xl">
                <div className="flex h-full flex-col overflow-y-scroll">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-[#8B3C5E]">
                        Shopping Cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={handleClose}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      {products.length === 0 ? (
                        <div className="text-center py-8 bg-[#F9F5F6] border border-[#FDCEDF] rounded-md shadow-md">
                          <p className="text-[#F2BED1] text-lg font-medium mb-4">
                            Your cart is currently empty
                          </p>
                          <p className="text-gray-500 mb-6">
                            It looks like you haven't added anything to your cart
                            yet. Explore our collection and add items you love!
                          </p>
                          <Link
                            onClick={handleClose}
                            to="/AllProducts"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#F2BED1] px-6 py-3 text-base font-medium text-[#F9F5F6] shadow-sm hover:bg-[#FDCEDF] transition-colors duration-300"
                          >
                            Start Shopping
                          </Link>
                        </div>
                      ) : (
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {products.map((product) => (
                              <li
                                key={product.id}
                                className="flex py-6 hover:bg-gray-100 transition-colors duration-300"
                              >
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    alt={product.imageAlt}
                                    src={product.img}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a
                                          href={product.href}
                                          className="hover:underline"
                                        >
                                          {product.Title}
                                        </a>
                                      </h3>
                                      <p className="ml-4 text-gray-900">
                                        {product.Price}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleQuantityChange(
                                            product.id,
                                            product.quantity - 1
                                          )
                                        }
                                        disabled={product.quantity === 1}
                                        className={`flex items-center justify-center w-8 h-8 bg-[#F9F5F6] text-gray-900 border border-gray-300 rounded-full 
                                          ${
                                            product.quantity === 1
                                              ? "cursor-not-allowed opacity-50"
                                              : "hover:bg-gray-200 focus:ring-2 focus:ring-gray-400"
                                          } 
                                          transition-colors duration-300`}
                                        aria-label="Decrease quantity"
                                      >
                                        <span className="text-lg font-semibold">
                                          –
                                        </span>
                                      </button>
                                      <p className="text-gray-900 mx-4 text-md font-medium">
                                        Qty {product.quantity}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleQuantityChange(
                                            product.id,
                                            product.quantity + 1
                                          )
                                        }
                                        className="flex items-center justify-center w-8 h-8 bg-[#F9F5F6] text-gray-900 border border-gray-300 rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
                                        aria-label="Increase quantity"
                                      >
                                        <span className="text-lg font-semibold">
                                          +
                                        </span>
                                      </button>
                                    </div>

                                    {/* Remove Button */}
                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveProduct(product.id)
                                        }
                                        className="ml-4 font-medium text-[#8B3C5E] hover:text-[#FDCEDF] transition-colors duration-300"
                                        aria-label="Remove item"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {products.length > 0 && (
                    <div className="border-t border-[#FDCEDF] px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-[#8B3C5E]">
                        <p>Subtotal</p>
                        <p>{cartTotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-[#8B3C5E]">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          onClick={handleClose}
                          to="/Checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-[#8B3C5E] px-6 py-3 text-base font-medium text-[#F9F5F6] shadow-sm hover:bg-[#F2BED1] transition-colors duration-300"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-[#8B3C5E]">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            onClick={handleClose}
                            className="font-medium text-[#8B3C5E] hover:text-[#FDCEDF] transition-colors duration-300"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
