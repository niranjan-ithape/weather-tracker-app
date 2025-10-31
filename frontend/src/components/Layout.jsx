// src/components/Layout.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // ✅ Recheck login when localStorage changes (e.g., after login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Auto-open sidebar when logged in
  useEffect(() => {
    if (isLoggedIn) setOpen(true);
    else setOpen(false);
  }, [isLoggedIn]);

  // ✅ If not logged in → show old layout (Navbar + background)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 text-white">
        {/* Navbar visible on every page */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Footer (optional) */}
        {/* 
        <footer className="bg-white/10 py-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">WeatherNow</span> — Built with ❤️ by Niranjan
          </p>
        </footer>
        */}
      </div>
    );
  }

  // ✅ If logged in → show new layout (Sidebar + Hamburger)
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-white text-gray-900">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header with hamburger */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white shadow">
          <h1 className="text-xl font-semibold text-sky-600">Weather App</h1>
          <button
            className="text-sky-600 text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
