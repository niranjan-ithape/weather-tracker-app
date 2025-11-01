import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";


const Layout = ({ children }) => {
  const token =localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  console.log(token);
  
  

//Sidebar routes where you want sidebar + dashboard layout
  const sidebarRoutes = ["/dashboard", "/add-city", "/all-cities", "/profile"];
  const isSidebarPage = sidebarRoutes.includes(location.pathname);

//Automatically check login when token changes
const isLoggedIn =token;

if (isLoggedIn && isSidebarPage) {
    return (
      <div className="flex min-h-screen bg-[#0b1623] text-gray-100 relative overflow-hidden">
        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-500 ${
            open ? "ml-64" : "ml-0"
          }`}
        >
          {/* Header with Hamburger */}
          <header className="flex items-center justify-between p-4 bg-[#0b1623]/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-20">
            <button
              onClick={() => setOpen(!open)}
              className="text-sky-400 text-3xl hover:text-sky-300 transition"
            >
              ☰
            </button>
          </header>

          {/* Page Content */}
          <main className="flex-1 bg-[#0b1623] w-full h-full">{children}</main>
        </div>
      </div>
    );
  }

return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
