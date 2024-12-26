import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
const navigate =useNavigate();
    const handleContactBtn=()=>{
navigate("/ContactUs")
    }
  return (
    <div className="bg-[#F9F5F6] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-[#8B3C5E] mb-8">
        About us
      </h1>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg text-gray-700 mb-6">
          Welcome to our handcrafted jewelry store, where every piece tells a
          story! At , we believe in the magic of unique designs
          that reflect the beauty and individuality of each person. Our
          collections feature an array of necklaces, bracelets, EarRings, and
          custom orders, meticulously crafted to perfection.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Founded with a passion for creativity and elegance, our mission is to
          provide stunning jewelry that complements every style and occasion.
          Whether you're looking for a statement piece or a delicate charm, we
          have something special for you.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Connect with us on social media or reach out directly for any
          inquiries or custom orders. Let's create something beautiful together!
        </p>
        <div className="flex justify-center gap-6 mb-6">
          {/* Icons for email, Instagram, and WhatsApp */}
          <a
            href="mailto:info@Brand name.com"
            className="text-[#8B3C5E] hover:text-[#F2BED1] transition-colors duration-300"
          >
            <i className="fas fa-envelope fa-2x"></i> {/* Email Icon */}
          </a>
          <a
            href="https://www.instagram.com/Brand name"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B3C5E] hover:text-[#F2BED1] transition-colors duration-300"
          >
            <i className="fab fa-instagram fa-2x"></i> {/* Instagram Icon */}
          </a>
          <a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B3C5E] hover:text-[#F2BED1] transition-colors duration-300"
          >
            <i className="fab fa-whatsapp fa-2x"></i> {/* WhatsApp Icon */}
          </a>
        </div>
        <button 
        onClick={handleContactBtn}
        className="bg-[#FDCEDF] text-[#8B3C5E] py-2 px-4 rounded-lg hover:bg-[#F2BED1] transition-colors duration-300">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutUs;