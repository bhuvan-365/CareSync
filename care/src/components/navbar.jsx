// Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3 backdrop-blur-md bg-white/30 shadow-md fixed top-0 w-full z-50">
      <div className="h-12">
        <img src="/image/nobglogo.png" alt="Logo" className="h-full object-contain" />
      </div>

      <nav>
        <ul className="flex gap-6 text-lg font-medium">
          <li><a href="#home" className="hover:text-blue-600">Home</a></li>
          <li><a href="#about" className="hover:text-blue-600">About</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
        </ul>
      </nav>

      <div className="h-8 w-8">
        <img src="/src/assets/account.svg" alt="Account" className="h-full w-full object-cover rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;
