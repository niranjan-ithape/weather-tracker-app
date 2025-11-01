// pages/Profile.jsx
import React from "react";
import { LogOut, User } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice"; // make sure you have this action
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state) => state.auth.user?.name);
  const email=useSelector((state)=>state.auth.user?.email);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center w-full max-w-sm border border-white/20 animate-fade-in">
        {/* Profile Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
            <User size={48} className="text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-1">{name}</h2>
        <h3 className="text-sm font-medium text-gray-300 m-0 p-0">{email}</h3>
        <p className="text-blue-200 mb-8 text-sm">Welcome back 🌟</p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.03] transition duration-300 shadow-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }   
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;
