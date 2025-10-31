import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CityCard from "../components/CityCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import API from "../api";

function genTrend(city) {
  // create 7-day mock trend around current temp
  const base = city?.weather?.temp ?? 20;
  return Array.from({ length: 7 }).map((_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    temp: Math.round(base + Math.sin(i + base) * 3 + (Math.random() * 2 - 1)),
  }));
}

export default function DashboardPage() {
  const [selected, setSelected] = useState(null);
  const [cities, setCities] = useState([]);
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    // try load cities for dashboard overview
    let cancelled = false;
    async function load() {
      try {
        const res = await API.get("/cities");
        if (!cancelled) {
          setCities(res.data);
          if (res.data.length) {
            setSelected(res.data[0]);
            setTrend(genTrend(res.data[0]));
          }
        }
      } catch (e) {
        // fallback mocks
        const fallback = [
          { _id: "1", name: "London", weather: { temp: 15, condition: "Clouds", icon: "03d", humidity: 72 } },
          { _id: "2", name: "Mumbai", weather: { temp: 29, condition: "Clear", icon: "01d", humidity: 65 } },
          { _id: "3", name: "New York", weather: { temp: 10, condition: "Rain", icon: "09d", humidity: 80 } },
        ];
        if (!cancelled) {
          setCities(fallback);
          setSelected(fallback[0]);
          setTrend(genTrend(fallback[0]));
        }
      }
    }
    load();
    return () => (cancelled = true);
  }, []);

  const onSelectCity = (city) => {
    setSelected(city);
    setTrend(genTrend(city));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 text-white">
      <Sidebar onSelectCity={(c) => onSelectCity(c)} />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Weather Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cities.map((c) => (
              <motion.div
                key={c._id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <CityCard city={c} onClick={onSelectCity} />
              </motion.div>
            ))}
          </div>

          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Selected City</h3>
            {selected ? (
              <div>
                <div className="text-xl font-bold">{selected.name}</div>
                <div className="text-sm text-blue-100">
                  {selected.weather?.condition} • {selected.weather?.temp ?? "--"}°C
                </div>
                <div className="text-sm text-blue-200 mt-2">Humidity: {selected.weather?.humidity ?? "--"}%</div>
              </div>
            ) : (
              <div>No city selected</div>
            )}
          </div>
        </div>

        <section className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Temperature Trend (7 days)</h3>
          {trend.length === 0 ? (
            <p className="text-sm text-blue-100">Select a city to see trends</p>
          ) : (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={trend} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "none", color: "#fff" }} />
                  <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
