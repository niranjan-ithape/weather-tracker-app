import React from "react";
import { Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Sun className="text-yellow-300 w-8 h-8 animate-spin-slow" />
        <h1 className="text-2xl font-bold tracking-wide">WeatherNow</h1>
      </div>

      <div className="hidden md:flex items-center gap-6 text-lg">
        <Link to="/home" className="hover:text-yellow-300 transition">Home</Link>
        <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
        <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
        <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
      </div>

      <button className="md:hidden bg-white/20 p-2 rounded-lg hover:bg-white/30 transition">
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
