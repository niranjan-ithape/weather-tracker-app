import React from "react";

export default function CityCard({ city, onClick }) {
  const iconUrl = city?.weather?.icon ? `https://openweathermap.org/img/wn/${city.weather.icon}@2x.png` : null;
  return (
    <div
      onClick={() => onClick(city)}
      className="bg-white/10 p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
    >
      <div className="flex items-center gap-4">
        {iconUrl ? (
          <img src={iconUrl} alt="icon" className="w-16 h-16" />
        ) : (
          <div className="w-16 h-16 bg-white/5 rounded flex items-center justify-center text-xl">☁️</div>
        )}

        <div>
          <div className="font-bold text-lg">{city.name}</div>
          <div className="text-sm text-blue-100">
            {city.weather?.condition ?? "--"} • {city.weather?.temp ?? "--"}°C
          </div>
          <div className="text-xs text-blue-200 mt-1">Humidity: {city.weather?.humidity ?? "--"}%</div>
        </div>
      </div>
    </div>
  );
}
