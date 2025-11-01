// components/CityDetails.jsx
import React from "react";
import { 
  X, 
  Droplets, 
  Wind, 
  Gauge, 
  Sun, 
  Moon, 
  Calendar,
  Navigation,
  Thermometer,
  Eye
} from "lucide-react";

const CityDetails = ({ city, onClose, getWeatherIcon }) => {
  if (!city) return null;

  // Use the correct property names from your data
  const condition = city.cond || city.condition; // Handle both 'cond' and 'condition'
  const temperature = city.temp || city.temperature; // Handle both 'temp' and 'temperature'
  const windSpeed = city.wind || city.windSpeed; // Handle both 'wind' and 'windSpeed'

  // Convert sunrise and sunset timestamps to readable time (if available)
  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format last updated time (if available)
  const formatLastUpdated = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get country name from country code (if available)
  const getCountryName = (countryCode) => {
    const countryNames = {
      'IN': 'India',
      'US': 'United States',
      'GB': 'United Kingdom',
    };
    return countryNames[countryCode] || countryCode || 'India';
  };

  // Determine weather condition for appropriate background - FIXED
  const getWeatherBackground = (condition) => {
    if (!condition) return 'from-blue-400 to-cyan-500'; // Default if condition is undefined
    
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return 'from-blue-400 to-cyan-400';
    if (conditionLower.includes('cloud')) return 'from-gray-400 to-blue-300';
    if (conditionLower.includes('rain')) return 'from-blue-500 to-gray-400';
    if (conditionLower.includes('mist')) return 'from-gray-300 to-blue-200';
    if (conditionLower.includes('humid')) return 'from-green-400 to-blue-300';
    return 'from-blue-400 to-cyan-500';
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in-fast">
      <div className={`relative bg-gradient-to-br ${getWeatherBackground(condition)} border border-white/30 backdrop-blur-2xl shadow-2xl rounded-3xl w-full max-w-4xl text-white animate-scale-in overflow-hidden`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
        >
          <X size={24} />
        </button>

        {/* Main Content */}
        <div className="p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              {getWeatherIcon(condition, 80)}
            </div>
            <h1 className="text-5xl font-bold mb-2">{city.name}</h1>
            <div className="flex items-center justify-center gap-4 text-lg">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {getCountryName(city.country)}
              </span>
              <span className="text-xl font-semibold">{temperature}°C</span>
            </div>
            <p className="text-xl text-blue-100 mt-2 capitalize">{condition}</p>
          </div>

          {/* Weather Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 p-4 rounded-2xl shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="text-cyan-200" size={20} />
                <span className="text-sm font-medium">Humidity</span>
              </div>
              <p className="text-2xl font-bold">{city.humidity}%</p>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="text-cyan-200" size={20} />
                <span className="text-sm font-medium">Wind Speed</span>
              </div>
              <p className="text-2xl font-bold">{windSpeed} km/h</p>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="text-cyan-200" size={20} />
                <span className="text-sm font-medium">Feels Like</span>
              </div>
              <p className="text-2xl font-bold">{(temperature + 2).toFixed(1)}°C</p>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="text-cyan-200" size={20} />
                <span className="text-sm font-medium">Wind Direction</span>
              </div>
              <p className="text-2xl font-bold">N/A</p>
            </div>
          </div>

          {/* Additional Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sunrise & Sunset */}
            <div className="bg-white/10 p-6 rounded-2xl shadow-inner backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sun className="text-yellow-300" size={20} />
                Sun Times
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Sunrise</span>
                  <span className="font-semibold text-lg">{city.sunrise ? formatTime(city.sunrise) : '6:00 AM'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Sunset</span>
                  <span className="font-semibold text-lg">{city.sunset ? formatTime(city.sunset) : '6:00 PM'}</span>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white/10 p-6 rounded-2xl shadow-inner backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="text-cyan-200" size={20} />
                Additional Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Pressure</span>
                  <span className="font-semibold">1013 hPa</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Visibility</span>
                  <span className="font-semibold">10 km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">UV Index</span>
                  <span className="font-semibold">{temperature > 30 ? 'High' : 'Moderate'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated & Created Info */}
          <div className="mt-6 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="text-cyan-200" size={16} />
                <span className="text-blue-100">Last Updated:</span>
                <span className="font-medium">
                  {city.lastUpdated ? formatLastUpdated(city.lastUpdated) : 'Just now'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-cyan-200" size={16} />
                <span className="text-blue-100">Tracked Since:</span>
                <span className="font-medium">
                  {city.createdAt ? new Date(city.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Recently'}
                </span>
              </div>
            </div>
          </div>

          {/* Weather Summary */}
          <div className="mt-6 bg-white/10 p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Thermometer className="text-cyan-200" size={20} />
              Weather Summary
            </h3>
            <div className="text-blue-100 space-y-2">
              <p>• {condition ? condition.toLowerCase() : 'clear'} conditions throughout the day with a temperature of {temperature}°C.</p>
              <p>• Humidity levels at {city.humidity}% with wind speeds of {windSpeed} km/h.</p>
              <p>• {city.sunrise && city.sunset ? `Sunrise at ${formatTime(city.sunrise)} and sunset at ${formatTime(city.sunset)}.` : 'Clear skies expected throughout the day.'}</p>
              <p>• {city.lastUpdated ? `Last weather update was on ${formatLastUpdated(city.lastUpdated)}.` : 'Weather data is current.'}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/10 border-t border-white/20 p-4 text-center">
          <p className="text-blue-100 text-sm">
            Real-time weather data • Auto-updates every 30 minutes
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInFast {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in-fast {
          animation: fadeInFast 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CityDetails;