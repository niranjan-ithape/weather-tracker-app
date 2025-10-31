 // pages/AddCity.jsx
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function AddCity() {
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState(null);

  const onAdd = (e) => {
    e.preventDefault();
    if (!city.trim()) return setMsg({ type: "err", text: "Enter city name" });
    // TODO: call your API to add the city
    setMsg({ type: "ok", text: `City "${city}" added (mock)` });
    setCity("");
    setTimeout(() => setMsg(null), 2500);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add City</h2>

      <form onSubmit={onAdd} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm text-slate-600 mb-2">City name</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-md border p-3"
            placeholder="e.g., Mumbai"
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md">
            <PlusCircle size={16} /> Add
          </button>
          <button type="button" onClick={() => setCity("")} className="px-4 py-2 border rounded-md">
            Reset
          </button>
        </div>

        {msg && <div className={`text-sm ${msg.type === "ok" ? "text-green-600" : "text-red-600"}`}>{msg.text}</div>}
      </form>
    </div>
  );
}
