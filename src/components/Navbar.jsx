import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollProgressBar from './ScrollProgressBar';
import TopBar from './TopBar';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`bg-primary-900 shadow-md  fixed w-full top-0 z-50 transform transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-15'
      }`}
      style={{ willChange: 'transform' }}
    >
      
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center select-none cursor-pointer">
          <img src="/RCLogo.webp" alt="RC Tours & Travels Logo" className="h-10 rounded-3xl w-auto mr-3" />
          <span className="text-2xl font-bold text-primary-50 whitespace-nowrap">
            RC Tours & Travels
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          {['home', 'cars', 'blog', 'contact'].map((item) => (
            <Link
              key={item}
              to={`/${item === 'home' ? '' : item}`}
              className="text-white hover:text-rental-blue transition-colors duration-300 font-semibold uppercase tracking-wide"
              tabIndex={0}
              aria-label={item.charAt(0).toUpperCase() + item.slice(1)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-primary-50 hover:bg-primary-700 transition"
        >
          {!mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
                <ScrollProgressBar /> 

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden bg-primary-900 px-6 py-10 space-y-6"
          role="menu"
          aria-label="Mobile navigation"
        >
          {['home', 'cars', 'blog', 'contact'].map((item) => (
            <Link
              key={item}
              to={`/${item === 'home' ? '' : item}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-rental-blue transition-colors duration-300 font-semibold uppercase tracking-wide"
              role="menuitem"
              tabIndex={0}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
