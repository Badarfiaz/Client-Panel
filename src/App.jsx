 import React from 'react'
 import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import AllProducts from './Pages/ProductsPage';
 import HomePage from './Pages/HomePage';
 import NavBar from './Components/NavBar'
 import { CheckoutPage } from './Pages/CheckoutPage';
 
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/Contactus';
  import CreateUser from './OrderPage/CreateUser'
  import LoginUser from './OrderPage/LoginUser'
 import OrderReview from './OrderPage/OrderReview';
import OrderMainPage from './OrderPage/OrderMainPage';
import Text from './OrderPage/Text'
import ReviewPage from './Pages/ReviewPage';

 function App() {
   return (
    <Router>
      <NavBar/>
            <div className="mt-16">
    
           <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/Productpage" element={<AllProducts />} />
            <Route path="/Checkout" element={<CheckoutPage />} />
            <Route path="/Aboutus" element={< AboutUs />} />
            <Route path="/Contactus" element={< ContactUs />} />
             <Route path="/orderMain" element={< OrderMainPage />} />
             <Route path="/review" element={< ReviewPage />} />
            






             <Route path="/Sign-in" element={< CreateUser />} />
            <Route path="/Order" element={< OrderReview />} />
            <Route path="/text" element={< Text />} />
            <Route path="/login" element={< LoginUser />} /> 
          
            
    
          </Routes>

          </div>
    
        </Router>
   )
 }
 
 export default App
 