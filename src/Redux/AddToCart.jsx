import { createSlice } from "@reduxjs/toolkit";

const localStorageKey = "cartState";

 const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(localStorageKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Helper function to save state to local storage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedState);
  } catch (err) {
  }
};

// Load initial state from local storage or use default
const initialState = loadStateFromLocalStorage() || {
  products: [],
  cartTotal: 0,
  TotalItems: 0,
  Notification: false,
  delivery: 0,

};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    UpdateTotalWithDelivery: (state, action) => {
      const delivery = action.payload;
      state.delivery = delivery;


      state.cartTotal = calculateTotal(state.products) + delivery;
    },
 

    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }

      state.TotalItems = state.products.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );


      state.cartTotal = calculateTotal(state.products) + state.delivery;
      saveStateToLocalStorage(state); // Save state to local storage
      console.log("Cart: " , product);
    },

    removeProduct: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.products.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        state.products = state.products.filter(
          (item) => item.id !== productId
        );
        state.TotalItems = state.products.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        );
        state.cartTotal = calculateTotal(state.products) + state.delivery;
        
        // Clear local storage when the product is removed
        if (state.products.length === 0) {
          localStorage.removeItem(localStorageKey); // Clear local storage
        } else {
          saveStateToLocalStorage(state); // Save updated state to local storage
        }
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find((item) => item.id === id);

      if (product) {
        if (quantity <= 0) {
          state.products = state.products.filter((item) => item.id !== id);
        } else {
          product.quantity = quantity;
        }
        state.TotalItems = state.products.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        );


        state.cartTotal = calculateTotal(state.products) + state.delivery;
      }
    },

    clearCart: (state) => {
      state.products = [];
      state.cartTotal = 0;
      state.TotalItems = 0;
      state.delivery = 0; // Reset delivery charges
      saveStateToLocalStorage({
        products: [],
        cartTotal: 0,
        TotalItems: 0,
        Notification: state.Notification,
        delivery: 0,
      }); // Clear local storage
    },

    setNotification: (state, action) => {
      state.Notification = action.payload;
    },

    clearNotification: (state) => {
      state.Notification = false;
      // Save state to local storage
    },
  },
});

const calculateTotal = (products) =>
  products.reduce(
    (total, product) => total + product.Price * (product.quantity || 1),
    0
  );

export const {
  UpdateTotalWithDelivery,
  addProduct,
  removeProduct,
  updateQuantity,
  clearCart,
  setNotification,
  clearNotification,
  ConfirmOrder,
} = CartSlice.actions;

export default CartSlice.reducer;