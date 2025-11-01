// pages/AddCity.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash/debounce";
import { PlusCircle, Search, Cloud, Sun, CloudRain } from "lucide-react";
import { useSelector } from "react-redux";


const icon = (cond) =>
  ({
    sunny: <Sun className="text-yellow-500" size={20} />,
    rainy: <CloudRain className="text-blue-400" size={20} />,
    cloudy: <Cloud className="text-gray-400" size={20} />,
    mist: <Cloud className="text-gray-300" size={20} />,
  }[cond?.toLowerCase()] || <Cloud className="text-gray-400" size={20} />);

export default function AddCity() {
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");
  

  const fetchSuggestions = async (query) => {
  if (!query.trim()) {
    setSuggestions([]);
    return;
  }

  try {
   

    const res = await fetch(
      `http://localhost:5000/api/weather/cities/suggest?s=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch suggestions. Unauthorized or invalid token.");
    }

    const data = await res.json();
    setSuggestions(data || []);
  } catch (err) {
    console.error("Error fetching suggestions:", err);
  }
};
const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

useEffect(() => {
    if (city.trim()) {
      debouncedFetch(city);
    } else {
      setSuggestions([]);
    }
  }, [city, debouncedFetch]);

//Close dropdown when clicking outside
useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
const handleAdd = async (e) => {
  e.preventDefault();

  if (!city.trim()) {
    setMsg({ type: "err", text: "Please enter a city name" });
    return;
  }

  try {
    setLoading(true);


    const res = await fetch("http://localhost:5000/api/weather/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ name: city }),
    });

    const data = await res.json();

    if (res.ok) {
      setMsg({ type: "ok", text: `City "${city}" added successfully!` });
    } else {
      setMsg({ type: "err", text: data.message || "Failed to add city" });
    }
  } catch (error) {
    console.error("Error adding city:", error);
    setMsg({ type: "err", text: "Server error. Please try again." });
  } finally {
    setLoading(false);
    setCity("");
    setSuggestions([]);
    setTimeout(() => setMsg(null), 2500);
  }
};

const handleSelect = (name) => {
    setCity(name);
    setSuggestions([]);
  };

return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-blue-900 text-white flex items-center justify-center px-4 select-none">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-xl border border-white/20 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <PlusCircle
            className="mx-auto text-blue-300 mb-3 animate-float"
            size={48}
          />
          <h1 className="text-3xl font-bold">Add New City</h1>
          <p className="text-blue-100 text-sm">Track weather instantly 🌤️</p>
        </div>

        {/* Form */}
        <form onSubmit={handleAdd} className="space-y-5">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              ref={inputRef}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Type city name..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 text-gray-800 shadow focus:ring-2 focus:ring-blue-400 outline-none transition"
            />

            {/* Dropdown */}
            {suggestions.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-10 bg-white w-full mt-2 rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in"
              >
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelect(s.name)}
                    onMouseDown={(e) => e.preventDefault()}
                    className="flex justify-between items-center px-4 py-3 hover:bg-blue-50 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2">
                      {icon(s.condition)}
                      <div>
                        <p className="font-medium text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.country}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">
                      {s.temperature?.toFixed(1)}°C
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow hover:shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <PlusCircle size={18} />
              )}
              {loading ? "Adding..." : "Add City"}
            </button>
            <button
              type="button"
              onClick={() => {
                setCity("");
                setSuggestions([]);
              }}
              className="px-6 py-3 border border-gray-300 bg-white/80 text-gray-700 rounded-xl hover:bg-gray-100 transition font-medium"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Message */}
        {msg && (
          <div
            className={`mt-5 p-3 rounded-xl text-center border-l-4 ${
              msg.type === "ok"
                ? "bg-green-50 border-green-400 text-green-700 animate-bounce-in"
                : "bg-red-50 border-red-400 text-red-700 animate-shake"
            }`}
          >
            {msg.text}
          </div>
        )}
      </div>

      {/* Background icons */}
      <Cloud
        className="absolute top-10 right-10 opacity-15 animate-float"
        size={80}
      />
      <Sun
        className="absolute bottom-20 left-10 opacity-10 animate-float"
        size={70}
      />
      <CloudRain
        className="absolute top-1/3 left-20 opacity-10 animate-float"
        size={60}
      />

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
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounceIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes shake {
          10%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          80% {
            transform: translateX(2px);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-bounce-in {
          animation: bounceIn 0.4s ease;
        }
        .animate-shake {
          animation: shake 0.3s ease;
        }
      `}</style>
    </div>
  );
}
