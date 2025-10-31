import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ for redirecting after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      // ✅ Real API call to backend
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      toast.success("Login successful! 🌤️ Welcome back to Weather Tracking App");

      // ✅ Optional: Save token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // ✅ Redirect to dashboard or home
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

      // Reset form
      setFormData({ email: "", password: "" });
    } catch (error) {
      toast.error(error.message || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-6 sm:p-10">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 transition-transform hover:scale-[1.02] duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Weather Tracking App
          </h1>
          <p className="text-gray-600">Log in to your account 🌈</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-sky-400">
              <span className="px-3 text-sky-600 text-lg">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-r-lg focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-sky-400">
              <span className="px-3 text-sky-600 text-lg">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-r-lg focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 text-white font-semibold rounded-lg transition duration-300 shadow-md ${
              loading
                ? "bg-sky-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-sky-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
