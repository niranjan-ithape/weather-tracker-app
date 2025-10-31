// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar.jsx";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 text-white">
      {/* Navbar visible on every page */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer (optional, can add your footer here too) */}
      {/* <footer className="bg-white/10 py-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">WeatherNow</span> — Built with ❤️ by Niranjan
        </p>
      </footer> */}
    </div>
  );
};

export default Layout;
