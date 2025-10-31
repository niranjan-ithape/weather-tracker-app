// pages/AllCities.jsx
import React, { useState } from "react";

const initial = [
  { id: 1, name: "Delhi", temp: 38, cond: "Sunny" },
  { id: 2, name: "Mumbai", temp: 31, cond: "Cloudy" },
  { id: 3, name: "Shimla", temp: 15, cond: "Rainy" },
  { id: 4, name: "Bangalore", temp: 26, cond: "Cloudy" },
];

export default function AllCities() {
  const [cities, setCities] = useState(initial);

  const remove = (id) => setCities((s) => s.filter((c) => c.id !== id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Cities</h2>
      <div className="space-y-3">
        {cities.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-3 rounded-md border">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-slate-500">{c.cond}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-semibold">{c.temp}°C</div>
              <button onClick={() => remove(c.id)} className="text-sm text-red-600 px-3 py-1 rounded-md border">
                Remove
              </button>
            </div>
          </div>
        ))}

        {cities.length === 0 && <div className="text-sm text-slate-500">No cities tracked yet.</div>}
      </div>
    </div>
  );
}
