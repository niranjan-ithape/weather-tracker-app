import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Trash2,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  MapPin,
  Thermometer,
  Filter,
  Eye,
} from "lucide-react";

export default function AllCities() {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherFilter, setWeatherFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/weather/cities", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch cities. Unauthorized or invalid token.");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCities(data);
          setFilteredCities(data);
        } else console.error("Unexpected API response:", data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    let result = cities;
    if (searchTerm) {
      result = result.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (weatherFilter !== "all") {
      result = result.filter((city) =>
        city.condition.toLowerCase().includes(weatherFilter.toLowerCase())
      );
    }
    setFilteredCities(result);
  }, [searchTerm, weatherFilter, cities]);

  useEffect(() => {
    if (sortConfig.key) {
      const sorted = [...filteredCities].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
      setFilteredCities(sorted);
    }
  }, [sortConfig]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const removeCity = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/weather/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) setCities((prev) => prev.filter((c) => c._id !== id));
      else console.error("Failed to delete city:", await res.text());
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return <Cloud className="text-gray-400" size={18} />;
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="text-yellow-500" size={18} />;
      case "rainy":
      case "rain":
        return <CloudRain className="text-blue-500" size={18} />;
      case "clouds":
      case "cloudy":
        return <Cloud className="text-gray-500" size={18} />;
      case "haze":
      case "mist":
      case "smoke":
        return <Wind className="text-green-500" size={18} />;
      default:
        return <Cloud className="text-gray-400" size={18} />;
    }
  };

  const getTempColor = (temp) => {
    if (temp >= 35) return "text-red-600";
    if (temp >= 25) return "text-orange-500";
    if (temp >= 15) return "text-green-500";
    return "text-blue-500";
  };

  const weatherConditions = ["all", "sunny", "clouds", "rainy", "haze", "mist", "smoke"];

  return (
    <div
      className="min-h-screen py-6 px-3 sm:px-6"
      style={{
        background:
          "linear-gradient(rgb(3, 16, 41) 0%, rgb(7, 18, 51) 50%, rgb(8, 16, 38) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="flex justify-center items-center mb-2">
            <MapPin className="text-blue-500 mr-2" size={28} />
            <Thermometer className="text-blue-500" size={32} />
          </div>
          <p className="text-gray-300 text-sm sm:text-base">
            Track and manage all your cities' weather data
          </p>
        </div>

        {/* Search + Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 mb-6 border border-white/60 animate-slide-up">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all bg-white text-gray-800 text-sm sm:text-base"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="text-gray-500" size={18} />
              <select
                value={weatherFilter}
                onChange={(e) => setWeatherFilter(e.target.value)}
                className="flex-1 sm:flex-none px-3 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white text-gray-800 text-sm sm:text-base"
              >
                {weatherConditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition.charAt(0).toUpperCase() + condition.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Count */}
            <div className="text-xs sm:text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg text-center">
              {filteredCities.length} {filteredCities.length === 1 ? "city" : "cities"} found
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-xs sm:text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
                  <th
                    onClick={() => handleSort("name")}
                    className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 transition-colors whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin size={14} /> City
                      {sortConfig.key === "name" && (
                        <span className="text-blue-500">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                    Condition
                  </th>
                  <th
                    onClick={() => handleSort("temperature")}
                    className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 transition-colors whitespace-nowrap"
                  >
                    Temperature
                    {sortConfig.key === "temperature" && (
                      <span className="text-blue-500 ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                    View
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCities.map((city, i) => (
                  <tr
                    key={city._id}
                    className="border-b border-gray-100 hover:bg-blue-50 transition-all animate-fade-in"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {city.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-gray-900 font-semibold text-sm sm:text-base">
                            {city.name}
                          </div>
                          <div className="text-gray-500 text-xs">{city.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getWeatherIcon(city.condition)}
                        <span className="text-gray-700 font-medium">{city.condition}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`font-bold ${getTempColor(city.temperature)}`}>
                        {city.temperature.toFixed(1)}°C
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/city/${encodeURIComponent(city.name)}`)}
                        className="flex items-center justify-center gap-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-all"
                      >
                        <Eye size={16} />
                        <span className="hidden sm:inline">View</span>
                      </button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => removeCity(city._id)}
                        className="flex items-center justify-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-all"
                      >
                        <Trash2 size={14} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center py-10 px-4 animate-fade-in">
              <Cloud className="mx-auto text-gray-400 mb-3" size={40} />
              <p className="text-gray-500 mb-1">No cities found</p>
              <p className="text-gray-400 text-xs sm:text-sm">
                {searchTerm || weatherFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No cities are being tracked yet"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Icons */}
      <div className="fixed top-6 right-4 sm:right-10 opacity-20 animate-float">
        <Cloud size={60} className="text-blue-400" />
      </div>
      <div
        className="fixed bottom-12 left-4 sm:left-10 opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Sun size={50} className="text-yellow-400" />
      </div>

      {/* Animations */}
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
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.7s ease-out;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
