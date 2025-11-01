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

        if (!res.ok) {
          throw new Error("Failed to fetch cities. Unauthorized or invalid token.");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setCities(data);
          setFilteredCities(data);
        } else {
          console.error("Unexpected API response:", data);
        }
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

      if (res.ok) {
        setCities((prev) => prev.filter((c) => c._id !== id));
        console.log(`City with id ${id} deleted successfully`);
      } else {
        console.error("Failed to delete city:", await res.text());
      }
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return <Cloud className="text-gray-400" size={20} />;
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="text-yellow-500" size={20} />;
      case "rainy":
      case "rain":
        return <CloudRain className="text-blue-500" size={20} />;
      case "clouds":
      case "cloudy":
        return <Cloud className="text-gray-500" size={20} />;
      case "haze":
      case "mist":
      case "smoke":
        return <Wind className="text-green-500" size={20} />;
      default:
        return <Cloud className="text-gray-400" size={20} />;
    }
  };

  const getTempColor = (temp) => {
    if (temp >= 35) return "text-red-600";
    if (temp >= 25) return "text-orange-500";
    if (temp >= 15) return "text-green-500";
    return "text-blue-500";
  };

  const weatherConditions = [
    "all",
    "sunny",
    "clouds",
    "rainy",
    "haze",
    "mist",
    "smoke",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#c9e5ff]/80 to-[#f7faff]/70 py-6 px-4 sm:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="flex justify-center items-center mb-3 sm:mb-4">
            <div className="relative">
              <MapPin className="text-blue-600 absolute -top-2 -left-2 opacity-70 hidden sm:block" size={32} />
              <Thermometer className="text-blue-600 relative z-10" size={40} sm:size={48} />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1 sm:mb-2">
            Weather Dashboard
          </h2>
          <p className="text-sm sm:text-base text-gray-600">Track and manage all your cities' weather data</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 mb-6 border border-white/60 animate-slide-up">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} sm:size={20} />
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-800 text-sm sm:text-base"
              />
            </div>

            {/* Weather Filter */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Filter className="text-gray-500" size={18} sm:size={20} />
              <select
                value={weatherFilter}
                onChange={(e) => setWeatherFilter(e.target.value)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-800 text-sm sm:text-base"
              >
                {weatherConditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition.charAt(0).toUpperCase() + condition.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Count */}
            <div className="text-xs sm:text-sm text-gray-600 bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap">
              {filteredCities.length} {filteredCities.length === 1 ? "city" : "cities"} found
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] sm:min-w-0">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
                  <th
                    onClick={() => handleSort("name")}
                    className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 transition-colors duration-200 min-w-[130px]"
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <MapPin size={14} sm:size={16} /> City
                      {sortConfig.key === "name" && (
                        <span className="text-blue-500 text-lg">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>

                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 min-w-[110px]">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Cloud size={14} sm:size={16} /> Condition
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort("temperature")}
                    className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 transition-colors duration-200 min-w-[100px]"
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Thermometer size={14} sm:size={16} /> Temperature
                      {sortConfig.key === "temperature" && (
                        <span className="text-blue-500 text-lg">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>

                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 min-w-[80px]">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Eye size={14} sm:size={16} /> View
                    </div>
                  </th>

                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 min-w-[80px]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCities.map((city, index) => (
                  <tr
                    key={city._id}
                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-base">
                          {city.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">{city.name}</div>
                          <div className="text-xs text-gray-500">{city.country}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        {getWeatherIcon(city.condition)}
                        <span className="font-medium text-gray-700 text-xs sm:text-sm">{city.condition}</span>
                      </div>
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className={`text-lg sm:text-xl font-bold ${getTempColor(city.temperature)}`}>
                        {city.temperature.toFixed(1)}°C
                      </div>
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <button
                        onClick={() => navigate(`/city/${encodeURIComponent(city.name)}`)}
                        className="flex items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-105 sm:hover:scale-110 border border-blue-200 hover:border-blue-300 text-xs sm:text-sm w-full sm:w-auto"
                        title="View City"
                      >
                        <Eye size={16} sm:size={18} />
                        <span className="hidden sm:inline">View</span>
                      </button>
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <button
                        onClick={() => removeCity(city._id)}
                        className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-105 border border-red-200 hover:border-red-300 text-xs sm:text-sm w-full sm:w-auto"
                      >
                        <Trash2 size={14} sm:size={16} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredCities.length === 0 && (
            <div className="text-center py-10 sm:py-12 animate-fade-in px-4">
              <Cloud className="mx-auto text-gray-400 mb-4" size={40} sm:size={48} />
              <div className="text-gray-500 text-base sm:text-lg mb-2">No cities found</div>
              <div className="text-gray-400 text-xs sm:text-sm">
                {searchTerm || weatherFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No cities are being tracked yet"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating icons */}
      <div className="fixed top-6 sm:top-10 right-4 sm:right-10 opacity-20 animate-float">
        <Cloud size={60} sm:size={80} className="text-blue-400" />
      </div>
      <div
        className="fixed bottom-12 sm:bottom-20 left-4 sm:left-10 opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Sun size={48} sm:size={60} className="text-yellow-400" />
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
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}