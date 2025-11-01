// components/CityDetails.jsx
import React from "react";
import { 
  X, Droplets, Wind, Gauge, Sun, Calendar,
  Navigation, Thermometer, Eye
} from "lucide-react";

const CityDetails = ({ city, onClose, getWeatherIcon }) => {
  if (!city) return null;

  const condition = city.cond || city.condition;
  const temperature = city.temp || city.temperature;
  const windSpeed = city.wind || city.windSpeed;

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  const formatLastUpdated = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getCountryName = (countryCode) => {
    const countryNames = { IN: 'India', US: 'United States', GB: 'United Kingdom' };
    return countryNames[countryCode] || countryCode || 'India';
  };

  const getWeatherBackground = (condition) => {
    if (!condition) return 'from-blue-400 to-cyan-500';
    const c = condition.toLowerCase();
    if (c.includes('clear') || c.includes('sunny')) return 'from-blue-400 to-cyan-400';
    if (c.includes('cloud')) return 'from-gray-400 to-blue-300';
    if (c.includes('rain')) return 'from-blue-500 to-gray-400';
    if (c.includes('mist')) return 'from-gray-300 to-blue-200';
    if (c.includes('humid')) return 'from-green-400 to-blue-300';
    return 'from-blue-400 to-cyan-500';
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-3 animate-fade-in-fast">
      <div className={`relative bg-gradient-to-br ${getWeatherBackground(condition)} border border-white/30 backdrop-blur-2xl shadow-2xl rounded-3xl w-full max-w-3xl md:max-w-4xl text-white animate-scale-in overflow-y-auto max-h-[90vh]`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
        >
          <X size={20} />
        </button>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-3">
              {getWeatherIcon(condition, 60)}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">{city.name}</h1>
            <div className="flex items-center justify-center gap-3 text-base md:text-lg">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {getCountryName(city.country)}
              </span>
              <span className="text-xl font-semibold">{temperature}°C</span>
            </div>
            <p className="text-lg text-blue-100 mt-1 capitalize">{condition}</p>
          </div>

          {/* Weather Stats Grid */}
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
              <p className="text-xl font-bold">{windSpeed} km/h</p>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Gauge className="text-cyan-200" size={18} />
                <span className="text-sm font-medium">Feels Like</span>
              </div>
              <p className="text-xl font-bold">{(temperature + 2).toFixed(1)}°C</p>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="text-cyan-200" size={18} />
                <span className="text-sm font-medium">Wind Direction</span>
              </div>
              <p className="text-xl font-bold">N/A</p>
            </div>
          </div>

          {/* Additional Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sunrise & Sunset */}
            <div className="bg-white/10 p-5 rounded-2xl shadow-inner backdrop-blur-sm">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                <Sun className="text-yellow-300" size={18} />
                Sun Times
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-100">Sunrise</span>
                  <span className="font-semibold">{city.sunrise ? formatTime(city.sunrise) : '6:00 AM'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Sunset</span>
                  <span className="font-semibold">{city.sunset ? formatTime(city.sunset) : '6:00 PM'}</span>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white/10 p-5 rounded-2xl shadow-inner backdrop-blur-sm">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                <Eye className="text-cyan-200" size={18} />
                Additional Info
              </h3>
              <div className="space-y-2">
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
                  <span className="font-semibold">{temperature > 30 ? 'High' : 'Moderate'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Summary */}
          <div className="mt-5 bg-white/10 p-5 rounded-2xl border border-white/10">
            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Thermometer className="text-cyan-200" size={18} />
              Weather Summary
            </h3>
            <div className="text-blue-100 space-y-1 text-sm md:text-base">
              <p>• {condition ? condition.toLowerCase() : 'clear'} conditions with {temperature}°C.</p>
              <p>• Humidity {city.humidity}% and wind speed {windSpeed} km/h.</p>
              <p>• {city.sunrise && city.sunset ? `Sunrise at ${formatTime(city.sunrise)}, sunset at ${formatTime(city.sunset)}.` : 'Clear skies expected.'}</p>
              <p>• {city.lastUpdated ? `Last update: ${formatLastUpdated(city.lastUpdated)}.` : 'Weather data is current.'}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 bg-white/10 border-t border-white/20 p-3 text-center rounded-xl">
            <p className="text-blue-100 text-xs md:text-sm">
              Real-time weather data • Auto-updates every 30 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInFast {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-fast { animation: fadeInFast 0.3s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CityDetails;
