import React, { useState } from "react";
import { Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-md sticky top-0 z-50 w-full">
      {/* Logo & Title + Mobile Toggle */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <Sun className="text-yellow-300 w-7 h-7 sm:w-8 sm:h-8 animate-spin-slow" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">WeatherNow</h1>
        </div>

        {/* Hamburger Button (Mobile Only) */}
        <button
          onClick={toggleMenu}
          className="sm:hidden bg-white/20 p-2 rounded-lg hover:bg-white/30 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Links */}
      <div className="hidden sm:flex items-center gap-4 md:gap-6 text-base md:text-lg">
        <Link to="/home" className="hover:text-yellow-300 transition">Home</Link>
        <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
        <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
        <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
      </div>

      {/* Mobile Menu (Toggleable) */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } sm:hidden w-full mt-3 flex-col gap-2 text-center transition-all duration-300`}
      >
        <Link
          to="/home"
          onClick={() => setIsOpen(false)}
          className="block py-2 hover:text-yellow-300 transition"
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => setIsOpen(false)}
          className="block py-2 hover:text-yellow-300 transition"
        >
          About
        </Link>
        <Link
          to="/contact"
          onClick={() => setIsOpen(false)}
          className="block py-2 hover:text-yellow-300 transition"
        >
          Contact
        </Link>
        <Link
          to="/login"
          onClick={() => setIsOpen(false)}
          className="block py-2 hover:text-yellow-300 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;