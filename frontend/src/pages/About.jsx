import React from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, Droplets, Wind } from "lucide-react";

const About = () => {
return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white flex flex-col">
      {/* ---------- HEADER ---------- */}
      <header className="text-center py-12 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          About <span className="text-yellow-300">WeatherNow</span>
        </motion.h1>
        <p className="max-w-3xl mx-auto text-blue-100 text-lg">
          WeatherNow is a modern, fast, and reliable weather tracking platform designed to
          give you accurate real-time weather updates for any city in the world.
        </p>
      </header>

      {/* ---------- ABOUT CONTENT ---------- */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-8 py-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-3xl font-bold text-yellow-300">Our Mission 🌤️</h2>
          <p className="text-blue-50 text-lg leading-relaxed">
            We believe that weather affects everything — from your mood to your plans.
            That’s why WeatherNow brings you a beautiful, easy-to-use platform that shows
            weather insights, forecasts, and trends — all in real-time.
          </p>
          <p className="text-blue-50 text-lg">
            Our goal is simple: make weather tracking intuitive, fun, and accessible for everyone.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative md:w-1/2 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="relative"
          >
            <Sun className="text-yellow-300 w-28 h-28 absolute top-0 left-1/2 -translate-x-1/2 animate-pulse" />
            <Cloud className="text-white w-48 h-48 mt-10" />
            <Droplets className="absolute bottom-0 left-10 text-blue-100 w-10 h-10" />
            <Wind className="absolute bottom-0 right-10 text-blue-100 w-10 h-10" />
          </motion.div>
        </motion.div>
      </section>

      {/* ---------- TEAM SECTION ---------- */}
      <section className="bg-white/10 backdrop-blur-md py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-8">Meet the Creator 💡</h3>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-white/20 rounded-2xl p-6 shadow-lg"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="creator"
            className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-yellow-300"
          />
          <h4 className="text-xl font-semibold">Niranjan Ithape</h4>
          <p className="text-blue-100">Full Stack Developer | MERN + AI Enthusiast</p>
          <p className="mt-4 text-sm text-blue-200">
            “I built WeatherNow to make weather tracking more interactive, reliable, and fun to use.”
          </p>
        </motion.div>
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

export default About;
