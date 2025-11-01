import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {X,Droplets,Wind,Gauge,Sun,Eye,Navigation,} from "lucide-react";
import { useSelector } from "react-redux";

const CityDetails = ({ getWeatherIcon }) => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [closing, setClosing] = useState(false);

const token = useSelector((state) => state.auth.user?.token);


useEffect(() => {
  const fetchCityData = async () => {
    try {
      setLoading(true);
      setError(null);

      // const token = localStorage.getItem("token"); // ✅ Get JWT token

      const res = await fetch(
        `http://localhost:5000/api/weather/cities/${cityName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch weather data");

      const data = await res.json();
      setCity(data);
    } catch (err) {
      console.error("Error fetching city data:", err);
      setError("Unable to load weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (cityName) fetchCityData();
}, [cityName]);


 
const handleClose = () => {
    setClosing(true);
    setTimeout(() => navigate("/all-cities"), 400);
  };

 
if(loading) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center text-white text-lg">
        <p>
          Loading weather data for <strong>{cityName}</strong>...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex flex-col items-center justify-center text-white text-lg">
        <p>{error}</p>
        <button
          onClick={handleClose}
          className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!city) return null;

const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

const formatLastUpdated = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

const getCountryName = (countryCode) => {
    const countryNames = {
      IN: "India",
      US: "United States",
      GB: "United Kingdom",
    };
    return countryNames[countryCode] || countryCode;
  };

const getWeatherBackground = (condition) => {
    const cond = condition.toLowerCase();
    if (cond.includes("clear")) return "from-blue-400 to-cyan-400";
    if (cond.includes("cloud")) return "from-gray-400 to-blue-300";
    if (cond.includes("rain")) return "from-blue-500 to-gray-400";
    if (cond.includes("mist")) return "from-gray-300 to-blue-200";
    return "from-blue-400 to-cyan-500";
  };

  
return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4 
      ${closing ? "animate-fade-out" : "animate-fade-in"}`}
    >
      <div
        className={`relative bg-gradient-to-br ${getWeatherBackground(
          city.condition
        )} border border-white/30 backdrop-blur-2xl shadow-2xl rounded-3xl 
        w-full max-w-3xl text-white transition-all duration-500 transform
        ${closing ? "animate-scale-out" : "animate-scale-in"} overflow-hidden`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
        >
          <X size={22} />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-3">
              {getWeatherIcon
                ? getWeatherIcon(city.condition, 70)
                : <Sun size={70} />}
            </div>
            <h1 className="text-4xl font-bold mb-1">{city.name}</h1>
            <div className="flex items-center justify-center gap-3 text-base">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {getCountryName(city.country)}
              </span>
              <span className="text-lg font-semibold">
                {city.temperature}°C
              </span>
            </div>
            <p className="text-lg text-blue-100 mt-2 capitalize">
              {city.condition}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="bg-white/10 p-3 rounded-2xl shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="text-cyan-200" size={18} />
                <span className="text-sm font-medium">Humidity</span>
              </div>
              <p className="text-xl font-bold">{city.humidity}%</p>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Wind className="text-cyan-200" size={18} />
                <span className="text-sm font-medium">Wind Speed</span>
              </div>
              <p className="text-xl font-bold">{city.windSpeed} km/h</p>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Gauge className="text-cyan-200" size={18} />
                <span className="text-sm font-medium">Feels Like</span>
              </div>
              <p className="text-xl font-bold">
                {(city.temperature + 2).toFixed(1)}°C
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="text-cyan-200" size={18} />
                <span className="text-sm font-medium">Wind Direction</span>
              </div>
              <p className="text-xl font-bold">N/A</p>
            </div>
          </div>

          {/* Sunrise & Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-5 rounded-2xl shadow-inner backdrop-blur-sm">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                <Sun className="text-yellow-300" size={18} />
                Sun Times
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-100">Sunrise</span>
                  <span className="font-semibold">
                    {formatTime(city.sunrise)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Sunset</span>
                  <span className="font-semibold">
                    {formatTime(city.sunset)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl shadow-inner backdrop-blur-sm">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                <Eye className="text-cyan-200" size={18} />
                Additional Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-100">Pressure</span>
                  <span className="font-semibold">1013 hPa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Visibility</span>
                  <span className="font-semibold">10 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">UV Index</span>
                  <span className="font-semibold">
                    {city.temperature > 30 ? "High" : "Moderate"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 bg-white/5 p-3 rounded-xl border border-white/10 text-center text-xs text-blue-100">
            <p>Last Updated: {formatLastUpdated(city.lastUpdated)}</p>
            <p>
              Tracked Since: {new Date(city.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.8); opacity: 0; }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-fade-out { animation: fadeOut 0.4s ease-in forwards; }
        .animate-scale-in { animation: scaleIn 0.4s ease-out forwards; }
        .animate-scale-out { animation: scaleOut 0.4s ease-in forwards; }
      `}</style>
    </div>
  );
};

export default CityDetails;
