// components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, PlusCircle, List } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { to: "/add-city", label: "Add City", icon: <PlusCircle size={18} /> },
  { to: "/all-cities", label: "All Cities", icon: <List size={18} /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className={`z-40 fixed top-0 left-0 h-full transform transition-all lg:static lg:translate-x-0`}
        style={{ width: open ? 260 : 72 }}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-white/70 to-white/60 backdrop-blur-lg border-r border-white/10 shadow-lg">
          {/* header */}
          <div className="flex items-center justify-between px-3 py-3 border-b border-white/8">
            <div className="flex items-center gap-2">
              <div className="rounded-lg p-1 bg-gradient-to-br from-indigo-600 to-cyan-500 text-white">
                🌦️
              </div>
              {open && <div className="text-sm font-semibold">Nebula Weather</div>}
            </div>

            {/* hamburger */}
            <button
              className="p-2 rounded-md hover:bg-white/10"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle sidebar"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* nav */}
          <nav className="flex-1 overflow-auto px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/6 transition-colors ${
                    isActive ? "bg-gradient-to-r from-indigo-600/30 to-cyan-500/20 text-white" : "text-slate-700"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <div className="opacity-90">{item.icon}</div>
                {open && <span className="text-sm font-medium">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* footer */}
          <div className="px-3 py-4 border-t border-white/6">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-white/6 p-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2v6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {open && <div className="text-xs text-slate-500">Auto-update every hour</div>}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* spacer for large screens (so content isn't under the sidebar) */}
      <div className="hidden lg:block w-18" style={{ width: 72 }} />
    </>
  );
}
