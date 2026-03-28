import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="campus-bazaar-logo">
      <div className="logo-icon-container">
        <svg width="45" height="45" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Map Pin Base Ellipse hole */}
          <ellipse cx="50" cy="115" rx="28" ry="10" stroke="currentColor" strokeWidth="8" fill="transparent"/>
          
          {/* Map Pin Form */}
          <path d="M50 10 C25 10, 12 30, 12 50 C12 80, 50 115, 50 115 C50 115, 88 80, 88 50 C88 30, 75 10, 50 10 Z" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinejoin="round" />
          
          {/* Inner Circle Border */}
          <circle cx="50" cy="46" r="22" stroke="currentColor" strokeWidth="4" fill="transparent" />
          
          {/* Shopping Cart Lines inside the circle */}
          <path d="M35 36 L40 36 L44 52 L59 52 L62 38 L40 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          
          {/* Cart Wheels */}
          <circle cx="45" cy="59" r="3" fill="currentColor"/>
          <circle cx="57" cy="59" r="3" fill="currentColor"/>
        </svg>
      </div>
      
      <div className="logo-text-container">
        <span className="logo-word-top">CAMPUS</span>
        <span className="logo-word-bottom">BAZAAR</span>
        <div className="logo-underline"></div>
      </div>
    </div>
  );
};

export default Logo;
