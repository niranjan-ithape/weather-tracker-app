import React from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, Droplets, Wind, MapPin, Thermometer, Clock } from "lucide-react"; 
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 text-white flex flex-col">
      
      {/* STATIC NAVBAR ADDED */}
      <Navbar />

      {/* ---------- HERO SECTION ---------- */}
      <section className="flex flex-col md:flex-row items-center justify-center flex-1 px-6 py-10 text-center md:text-left">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-5"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Check <span className="text-yellow-300">Live Weather</span> <br /> of Any City 🌤️
          </h2>
          <p className="text-lg text-blue-50">
            Get real-time weather updates, forecasts, and insights instantly.
            Track multiple cities and plan your day smarter.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition shadow-lg"
            >
              Explore Weather
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-blue-700 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative md:w-1/2 flex justify-center mt-10 md:mt-0"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="relative"
          >
            <Sun className="text-yellow-300 w-32 h-32 absolute top-0 left-1/2 -translate-x-1/2 animate-pulse" />
            <Cloud className="text-white w-48 h-48 mt-16" />
            <motion.div
              animate={{ x: [0, 30, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-10 left-16 text-blue-100"
            >
              <Droplets className="w-12 h-12" />
            </motion.div>
            <motion.div
              animate={{ x: [0, -30, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-8 right-12 text-blue-100"
            >
              <Wind className="w-12 h-12" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------- FEATURES SECTION ---------- */}
      <section className="py-20 px-6 bg-white/10 backdrop-blur-md">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose WeatherNow?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: MapPin, title: "City-Based Forecasts", desc: "Get accurate weather data for your current location or any city worldwide." },
            { icon: Thermometer, title: "Real-Time Updates", desc: "Stay informed with live temperature, humidity, and air quality data." },
            { icon: Clock, title: "7-Day Forecast", desc: "Plan ahead with detailed forecasts for the coming week." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 p-6 rounded-2xl text-center shadow-lg hover:shadow-yellow-300/20 transition"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-blue-50">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- STATS / INSIGHTS SECTION ---------- */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h3 className="text-3xl font-bold text-center mb-12">Global Weather Insights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
          {[
            { value: "1200+", label: "Cities Tracked" },
            { value: "99.9%", label: "Accuracy Rate" },
            { value: "24/7", label: "Live Updates" },
            { value: "10k+", label: "Happy Users" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white/10 rounded-xl shadow-lg"
            >
              <h4 className="text-4xl font-bold text-yellow-300">{item.value}</h4>
              <p className="text-blue-100 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- TESTIMONIALS SECTION ---------- */}
      <section className="py-20 px-6 bg-white/10 backdrop-blur-md">
        <h3 className="text-3xl font-bold text-center mb-12">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Amit Sharma", text: "The best weather app I’ve ever used! The animations make it so fun.", emoji: "🌈" },
            { name: "Priya Patel", text: "Super accurate and the dashboard is beautiful. Highly recommended!", emoji: "☀️" },
            { name: "Rahul Mehta", text: "I love how simple yet powerful this app is. Perfect for travel planning!", emoji: "🌍" },
          ].map((review, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 p-6 rounded-2xl shadow-lg hover:shadow-yellow-300/20 transition"
            >
              <p className="text-lg italic mb-4">“{review.text}”</p>
              <h4 className="font-semibold text-yellow-300">{review.name} {review.emoji}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- CALL TO ACTION ---------- */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900">
        <motion.h3
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Start Tracking Weather Like a Pro!
        </motion.h3>
        <Link
          to="/dashboard"
          className="px-8 py-3 bg-white font-semibold rounded-full hover:bg-gray-100 transition shadow-lg"
        >
          Get Started Now
        </Link>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-white/10 py-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">WeatherNow</span> — Built with ❤️ by Niranjan
        </p>
      </footer>
    </div>
  );
};

export default Home;
