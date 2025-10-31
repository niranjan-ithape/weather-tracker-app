import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We’ll get back to you soon. 😊");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400 text-white flex flex-col">
      {/* ---------- HEADER ---------- */}
      <header className="text-center py-12 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Contact <span className="text-yellow-300">Us</span>
        </motion.h1>
        <p className="max-w-3xl mx-auto text-blue-100 text-lg">
          Have questions or feedback? We’d love to hear from you! Fill out the form below or reach us directly.
        </p>
      </header>

      {/* ---------- CONTACT CONTENT ---------- */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-8 py-12 max-w-6xl mx-auto w-full">
        {/* Left - Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2 space-y-6"
        >
          <div className="flex items-center gap-4">
            <Mail className="text-yellow-300 w-6 h-6" />
            <p>weathernow@example.com</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-yellow-300 w-6 h-6" />
            <p>+91 9325946415</p>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="text-yellow-300 w-6 h-6" />
            <p>Pune, Maharashtra, India</p>
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.form
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="md:w-1/2 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full"
        >
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 placeholder-blue-100 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 placeholder-blue-100 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-blue-100 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-yellow-300 transition shadow-lg"
            >
              Send Message
            </button>
          </div>
        </motion.form>
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

export default Contact;
