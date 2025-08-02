import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Handle navigation - scroll to section if on home page, or navigate to home page first
  const handleNavigation = (sectionId) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll after a small delay
      window.location.href = `/#${sectionId}`;
    }
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" onClick={closeMenu}>
            <img src="/image/nobglogo1.png" alt="Logo" className="logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li>
              <button 
                className="nav-link" 
                onClick={() => handleNavigation('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className="nav-link" 
                onClick={() => handleNavigation('about')}
              >
                About
              </button>
            </li>
            <li>
              <button 
                className="nav-link" 
                onClick={() => handleNavigation('contact')}
              >
                Contact
              </button>
            </li>

          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="mobile-right">
          <button className="mobile-menu-button" onClick={toggleMenu}>
            <svg className="hamburger-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d={isMenuOpen ? "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" : "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li>
              <button 
                className="mobile-nav-link" 
                onClick={() => handleNavigation('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className="mobile-nav-link" 
                onClick={() => handleNavigation('about')}
              >
                About
              </button>
            </li>
            <li>
              <button 
                className="mobile-nav-link" 
                onClick={() => handleNavigation('contact')}
              >
                Contact
              </button>
            </li>
            <li>

            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;