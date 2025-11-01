import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Plus, List } from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        animate={{ x: open ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#c9e5ff]/80 to-[#f7faff]/70
                   backdrop-blur-xl shadow-xl border-r border-sky-100 z-40 flex flex-col"
      >
        {/* Simple Header */}
        <div className="flex items-center justify-between p-5 border-b border-sky-100/50">
          <h2 className="text-lg font-semibold text-sky-600">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-sky-500 text-2xl hover:text-sky-700"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 text-gray-700 font-medium">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#d0e8ff] to-[#b3dbff] text-sky-700 font-semibold shadow-md"
                  : "hover:bg-sky-100"
              }`
            }
            onClick={() => setOpen(false)}
          >
            <Home size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/add-city"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#d0e8ff] to-[#b3dbff] text-sky-700 font-semibold shadow-md"
                  : "hover:bg-sky-100"
              }`
            }
            onClick={() => setOpen(false)}
          >
            <Plus size={20} />
            Add City
          </NavLink>

          <NavLink
            to="/all-cities"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#d0e8ff] to-[#b3dbff] text-sky-700 font-semibold shadow-md"
                  : "hover:bg-sky-100"
              }`
            }
            onClick={() => setOpen(false)}
          >
            <List size={20} />
            All Cities
          </NavLink>
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;
