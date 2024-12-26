import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Email as EmailIcon, Instagram as InstagramIcon, WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

const ContactUs = () => {
  return (
    <div className="bg-[#F9F5F6] min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <Box className="text-center mb-8">
      <Box className="text-center mb-8">
  <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8B3C5E] to-[#FFB6C1]">
   Contact Us 
  </h1>
</Box>
        <Typography variant="body1" className="text-gray-700 text-base sm:text-lg lg:text-xl">
          We’d love to hear from you! Whether you have a question, need assistance, or want to discuss a custom jewelry order, feel free to reach out.
        </Typography>
      </Box>

      {/* Contact Details */}
      <Box className="flex flex-wrap justify-center gap-6 mb-8">
        <IconButton
          href="mailto:reemfiaz344@icloud.com"
          className="text-[#8B3C5E] hover:text-[#F2BED1] transition-transform duration-300 transform hover:scale-110"
          aria-label="Email"
        >
          <EmailIcon fontSize="large" />
        </IconButton>
        <IconButton
          href="https://www.instagram.com/enchantbyreem/?igsh=MXF2YWc4d3piZGFleQ%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8B3C5E] hover:text-[#F2BED1] transition-transform duration-300 transform hover:scale-110"
          aria-label="Instagram"
        >
          <InstagramIcon fontSize="large" />
        </IconButton>
        <IconButton
          href="https://wa.me/03344444503"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8B3C5E] hover:text-[#F2BED1] transition-transform duration-300 transform hover:scale-110"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon fontSize="large" />
        </IconButton>
        <IconButton
          href="https://www.tiktok.com/@enchantbyreem?_op=1&_r=1&_t=8dDQZ6xkBIw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8B3C5E] hover:text-[#F2BED1] transition-transform duration-300 transform hover:scale-110"
          aria-label="TikTok"
        >
          <FontAwesomeIcon icon={faTiktok} size="2x" />
        </IconButton>
      </Box>

      {/* Additional Section */}
      <Box className="text-center mt-8">
        <Typography variant="h6" className="text-[#8B3C5E] font-bold mb-2 text-xl sm:text-2xl">
          Follow Us
        </Typography>
        <Typography variant="body2" className="text-gray-700 text-sm sm:text-base lg:text-lg">
          Stay connected and follow us on social media for the latest updates and promotions.
        </Typography>
      </Box>
    </div>
  );
}

export default ContactUs;