import React, { useEffect, useState } from "react";
import API from "../api"; // axios wrapper: baseURL -> VITE_API_BASE or http://localhost:5000/api
import { Trash2, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({ onSelectCity }) {
  const [cities, setCities] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const mock = [
    {
      _id: "1",
      name: "London",
      weather: { temp: 15, condition: "Clouds", icon: "03d", humidity: 72 },
    },
    {
      _id: "2",
      name: "Mumbai",
      weather: { temp: 29, condition: "Clear", icon: "01d", humidity: 65 },
    },
  ];

  useEffect(() => {
    // Try load from backend; if fails use mock
    let cancelled = false;
    async function load() {
      try {
        const res = await API.get("/cities");
        if (!cancelled) setCities(res.data);
      } catch (e) {
        // fallback
        if (!cancelled) setCities(mock);
      }
    }
    load();
    return () => (cancelled = true);
  }, []);

  const addCity = async (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await API.post("/cities", { name: q.trim() });
      setCities((p) => [res.data, ...p]);
      setQ("");
    } catch (err) {
      // fallback: push to UI with fake id
      setCities((p) => [
        { _id: Date.now().toString(), name: q.trim(), weather: { temp: "--", condition: "Unknown" } },
        ...p,
      ]);
      setQ("");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Remove city from tracking?")) return;
    try {
      await API.delete(`/cities/${id}`);
      setCities((p) => p.filter((c) => c._id !== id));
    } catch (e) {
      // fallback UI remove
      setCities((p) => p.filter((c) => c._id !== id));
    }
  };

  return (
    <aside className="w-80 bg-white/5 backdrop-blur-md p-4 min-h-screen">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-sm text-blue-100">Tracked cities & quick actions</p>
      </div>

      <form onSubmit={addCity} className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-blue-200" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Add city (e.g., Paris)"
            className="w-full pl-10 pr-3 py-2 rounded bg-white/10 placeholder-blue-100"
          />
        </div>
        <button
          disabled={loading}
          className="px-3 bg-yellow-400 rounded flex items-center gap-2"
          title="Add"
        >
          <Plus size={16} /> Add
        </button>
      </form>

      <div className="space-y-3 overflow-auto max-h-[60vh] pr-2">
        {cities.map((c) => (
          <motion.div
            key={c._id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="bg-white/10 p-3 rounded flex items-center justify-between hover:bg-white/20 transition"
          >
            <button
              className="text-left"
              onClick={() => onSelectCity(c)}
              aria-label={`Open ${c.name}`}
            >
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-blue-100">
                {c.weather?.condition ?? "--"} • {c.weather?.temp ?? "--"}°C
              </div>
            </button>

            <div className="flex items-center gap-2">
              <button className="text-red-400" onClick={() => remove(c._id)} title="Remove">
                <Trash2 />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-sm text-blue-100">
        <p>Tip: Click a city to view details and temperature trends.</p>
      </div>
    </aside>
  );
}
