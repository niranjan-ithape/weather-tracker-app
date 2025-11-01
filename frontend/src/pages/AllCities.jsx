import CityDetails from "../components/CityDetails"; // ✅ new import
import React, { useState, useEffect } from "react";
import {Search,Trash2, Cloud,Sun,CloudRain,Wind,MapPin,Thermometer,Filter,Eye,
} from "lucide-react";

const initial = [
  { id: 1, name: "Delhi", temp: 38, cond: "Sunny", humidity: 45, wind: 12 },
  { id: 2, name: "Mumbai", temp: 31, cond: "Cloudy", humidity: 78, wind: 18 },
  { id: 3, name: "Shimla", temp: 15, cond: "Rainy", humidity: 92, wind: 8 },
  { id: 4, name: "Bangalore", temp: 26, cond: "Cloudy", humidity: 65, wind: 14 },
  { id: 5, name: "Chennai", temp: 35, cond: "Sunny", humidity: 70, wind: 16 },
  { id: 6, name: "Kolkata", temp: 33, cond: "Humid", humidity: 85, wind: 10 },
  { id: 7, name: "Jaipur", temp: 40, cond: "Sunny", humidity: 35, wind: 20 },
  { id: 8, name: "Hyderabad", temp: 29, cond: "Partly Cloudy", humidity: 60, wind: 15 },
];

export default function AllCities() {
  const [cities, setCities] = useState(initial);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState(initial);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [weatherFilter, setWeatherFilter] = useState("all");
  const [selectedCity, setSelectedCity] = useState(null);

  // Filter cities
  useEffect(() => {
    let result = cities;

    if (searchTerm) {
      result = result.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (weatherFilter !== "all") {
      result = result.filter((city) =>
        city.cond.toLowerCase().includes(weatherFilter.toLowerCase())
      );
    }

    setFilteredCities(result);
  }, [searchTerm, cities, weatherFilter]);

  // Sort cities
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

  const remove = (id) => setCities((s) => s.filter((c) => c.id !== id));

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="text-yellow-500" size={20} />;
      case "rainy":
        return <CloudRain className="text-blue-500" size={20} />;
      case "cloudy":
        return <Cloud className="text-gray-500" size={20} />;
      case "humid":
        return <Wind className="text-green-500" size={20} />;
      case "partly cloudy":
        return <Cloud className="text-gray-400" size={20} />;
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

  const weatherConditions = ["all", "sunny", "cloudy", "rainy", "humid", "partly cloudy"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#c9e5ff]/80 to-[#f7faff]/70 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center items-center mb-4">
            <div className="relative">
              <MapPin className="text-blue-600 absolute -top-2 -left-2 opacity-70" size={32} />
              <Thermometer className="text-blue-600 relative z-10" size={48} />
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Weather Dashboard
          </h2>
          <p className="text-gray-600">
            Track and manage all your cities' weather data
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-white/60 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-800"
              />
            </div>

            {/* Weather Filter */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <Filter className="text-gray-500" size={20} />
              <select
                value={weatherFilter}
                onChange={(e) => setWeatherFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-800"
              >
                {weatherConditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition.charAt(0).toUpperCase() + condition.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Count */}
            <div className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
              {filteredCities.length} {filteredCities.length === 1 ? "city" : "cities"} found
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
                  <th
                    onClick={() => handleSort("name")}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin size={16} /> City{" "}
                      {sortConfig.key === "name" && (
                        <span className="text-blue-500">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Cloud size={16} /> Condition
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort("temp")}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <Thermometer size={16} /> Temperature{" "}
                      {sortConfig.key === "temp" && (
                        <span className="text-blue-500">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Eye size={16} /> View
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCities.map((city, index) => (
                  <tr
                    key={city.id}
                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {city.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{city.name}</div>
                          <div className="text-xs text-gray-500">India</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getWeatherIcon(city.cond)}
                        <span className="font-medium text-gray-700">{city.cond}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className={`text-xl font-bold ${getTempColor(city.temp)}`}>
                        {city.temp}°C
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedCity(city)}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-110 border border-blue-200 hover:border-blue-300"
                        title="View City"
                      >
                        <Eye size={18} />
                        <span className="text-sm">View</span>
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => remove(city.id)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-105 border border-red-200 hover:border-red-300"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredCities.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <Cloud className="mx-auto text-gray-400 mb-4" size={48} />
              <div className="text-gray-500 text-lg mb-2">No cities found</div>
              <div className="text-gray-400 text-sm">
                {searchTerm || weatherFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No cities are being tracked yet"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating icons */}
      <div className="fixed top-10 right-10 opacity-20 animate-float">
        <Cloud size={80} className="text-blue-400" />
      </div>
      <div
        className="fixed bottom-20 left-10 opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Sun size={60} className="text-yellow-400" />
      </div>

      {/* ✅ CityDetails Modal - Fixed */}
      {selectedCity && (
        <CityDetails 
          city={selectedCity} 
          onClose={() => setSelectedCity(null)}
          getWeatherIcon={getWeatherIcon}
        />
      )}

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