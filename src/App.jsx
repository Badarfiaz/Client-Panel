 import React from 'react'
 import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import AllProducts from './Pages/ProductsPage';
 import HomePage from './Pages/HomePage';
 import NavBar from './Components/NavBar'
 import { CheckoutPage } from './Pages/CheckoutPage';
import AboutUs from './Pages/AboutUs';
import ContactUs from '../src/Pages/ContactUs';
  import CreateUser from './OrderPage/CreateUser'
 import OrderReview from './OrderPage/OrderReview';
import OrderMainPage from './OrderPage/OrderMainPage';
import ReviewPage from './Pages/ReviewPage';
import ComplaintsPage from './Pages/ComplaintsPage'
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
 function App() {
   return (
    <Router>
        <ScrollToTop/>
            <div className="mt-16">
      <NavBar/>
    
           <Routes>
             <Route path="/" element={<HomePage/>} />
             <Route path="/Productpage" element={<AllProducts />} />
             <Route path="/Checkout" element={<CheckoutPage />} />
             <Route path="/Aboutus" element={< AboutUs />} />
             <Route path="/Contactus" element={< ContactUs />} />
             <Route path="/orderMain" element={< OrderMainPage />} />
             <Route path="/review" element={< ReviewPage />} />
             <Route path="/Complaints" element={< ComplaintsPage />} />
             <Route path="/Sign-in" element={< CreateUser />} />
             <Route path="/Order" element={< OrderReview />} />
 
          
            
    
          </Routes>

          </div>
          <Footer/>
    
        </Router>
   )
 }
 
 export default App
 