import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import  ClientStore from './Redux/ClientStore.jsx'
import App from "./App.jsx";

// Create the root container
const root = createRoot(document.getElementById("root"));

// Render the app using createRoot
root.render(
  <StrictMode>
    <Provider store={ClientStore}>
      <App />
    </Provider>
  </StrictMode>
);
