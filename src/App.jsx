 import React from 'react'
 import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import AllProducts from './Pages/ProductsPage';
 import HomePage from './Pages/HomePage';
 import NavBar from './Components/NavBar'
 import { CheckoutPage } from './Pages/CheckoutPage';
 import PaymentPage from './Pages/ProceedToPayment'
import Paymentmethod from './Pages/Paymentmethod';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/Contactus';



 function App() {
   return (
    <Router>
            <div className="mt-16">
      <NavBar/>
    
           <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/Productpage" element={<AllProducts />} />
            <Route path="/Checkout" element={<CheckoutPage />} />
            <Route path="/Payment" element={<PaymentPage />} />
            <Route path="/Payment-Method" element={< Paymentmethod />} />
            <Route path="/Aboutus" element={< AboutUs />} />
            <Route path="/Contactus" element={< ContactUs />} />
         
            
    
          </Routes>

          </div>
    
        </Router>
   )
 }
 
 export default App
 