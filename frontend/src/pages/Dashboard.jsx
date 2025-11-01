import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,PieChart,Pie, Cell,} from "recharts";
import {MapPin,Thermometer,Flame,Snowflake,Cloud,Droplet,Wind,Clock,RefreshCcw,} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NEON = {
  cyan: "#06b6d4",
  purple: "#7c3aed",
  pink: "#ec4899",
  yellow: "#f59e0b",
};

const StatPod = ({ icon, title, value, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, y: -6 }}
    transition={{ duration: 0.35 }}
    className="relative rounded-2xl p-4 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.03),transparent)] border border-white/10 shadow-lg flex flex-col"
    style={{
      boxShadow: `0 6px 24px rgba(2,6,23,0.6), 0 0 18px ${accent}33`,
      backdropFilter: "blur(8px)",
    }}
  >
    <div className="flex items-start gap-3">
      <div
        className="p-3 rounded-lg flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
          border: `1px solid ${accent}44`,
        }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wide text-slate-300">
          {title}
        </div>
        <div className="text-2xl font-bold text-white mt-1 break-words">
          {value}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function FuturisticWeatherDashboard() {
  const [cities, setCities] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/weather/cities", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setCities(data);
        calculateMetrics(data);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (err) {
      console.error("Error fetching cities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateMetrics = (data) => {
    if (!data.length) return;

    const totalCities = data.length;
    const avgTemp = data.reduce((sum, c) => sum + c.temperature, 0) / totalCities;
    const avgHumidity = data.reduce((sum, c) => sum + c.humidity, 0) / totalCities;
    const avgWind = data.reduce((sum, c) => sum + c.windSpeed, 0) / totalCities;

    const hottest = data.reduce((a, b) => (a.temperature > b.temperature ? a : b));
    const coldest = data.reduce((a, b) => (a.temperature < b.temperature ? a : b));

    const conditionCount = {};
    data.forEach((c) => {
      conditionCount[c.condition] = (conditionCount[c.condition] || 0) + 1;
    });
    const conditionSplit = Object.entries(conditionCount).map(([name, value]) => ({
      name,
      value,
    }));

    setMetrics({
      totalCities,
      avgTemp: avgTemp.toFixed(2),
      hottestCity: hottest.name,
      hottestTemp: hottest.temperature.toFixed(1),
      coldestCity: coldest.name,
      coldestTemp: coldest.temperature.toFixed(1),
      globalCondition:
        Object.keys(conditionCount).length > 1
          ? "Mixed"
          : Object.keys(conditionCount)[0],
      avgHumidity: avgHumidity.toFixed(1),
      avgWind: avgWind.toFixed(1),
      lastUpdated: new Date().toLocaleString(),
      conditionSplit,
    });
  };

  const topCities =
    [...cities]
      .sort((a, b) => b.temperature - a.temperature)
      .slice(0, 4)
      .map((c) => ({
        name: c.name,
        temp: c.temperature.toFixed(1),
        cond: c.condition,
      })) || [];

  const trendData =
    cities.slice(0, 7).map((c) => ({
      day: c.name,
      avg: c.temperature,
    })) || [];

  const handleProfileClick = () => navigate("/profile");

  return (
    <div
      className="min-h-screen p-4 sm:p-6"
      style={{
        background:
          "linear-gradient(180deg,#031029 0%, #071233 50%, #081026 100%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.header
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                style={{
                  background: `linear-gradient(135deg, ${NEON.purple}, ${NEON.cyan})`,
                }}
                className="p-3 rounded-2xl shadow-lg flex items-center justify-center"
              >
                <Cloud className="text-white" size={26} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 text-center sm:text-left">
                  Weather Dashboard
                </div>
                <div className="text-sm text-slate-300 text-center sm:text-left">
                  Real-time weather analytics
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3">
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition"
              >
                <RefreshCcw size={16} />
                Refresh
              </button>
              <div
                onClick={handleProfileClick}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm cursor-pointer transition"
              >
                Profile
              </div>
            </div>
          </div>
        </motion.header>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="border-4 border-t-transparent border-cyan-400 rounded-full w-12 h-12"
            />
          </div>
        ) : (
          metrics && (
            <>
              {/* Stats Grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatPod icon={<MapPin size={20} className="text-white" />} title="Total Cities" value={metrics.totalCities} accent={NEON.cyan} />
                <StatPod icon={<Thermometer size={20} className="text-white" />} title="Average Temp" value={`${metrics.avgTemp}°C`} accent={NEON.purple} />
                <StatPod icon={<Flame size={20} className="text-white" />} title="Hottest City" value={metrics.hottestCity} accent={NEON.pink} />
                <StatPod icon={<Snowflake size={20} className="text-white" />} title="Coldest City" value={metrics.coldestCity} accent={NEON.cyan} />
                <StatPod icon={<Cloud size={20} className="text-white" />} title="Global Condition" value={metrics.globalCondition} accent={NEON.purple} />
                <StatPod icon={<Droplet size={20} className="text-white" />} title="Average Humidity" value={`${metrics.avgHumidity}%`} accent={NEON.cyan} />
                <StatPod icon={<Wind size={20} className="text-white" />} title="Average Wind" value={`${metrics.avgWind} km/h`} accent={NEON.pink} />
                <StatPod icon={<Clock size={20} className="text-white" />} title="Last Updated" value={metrics.lastUpdated} accent={NEON.yellow} />
              </section>

              {/* Charts Section */}
              <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gradient-to-tr from-[#051124] to-[#07112a] border border-white/10 rounded-2xl p-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div>
                      <div className="text-white font-semibold text-center sm:text-left">
                        Temperature Trends
                      </div>
                      <div className="text-sm text-slate-400 text-center sm:text-left">
                        City-wise temperature overview
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 text-center sm:text-right">
                      Last refreshed: {metrics.lastUpdated}
                    </div>
                  </div>

                  <div className="h-[300px] sm:h-[340px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip wrapperStyle={{ background: "#0b1220", borderRadius: 8 }} />
                        <Line type="monotone" dataKey="avg" stroke={NEON.purple} strokeWidth={3} dot={{ r: 4, stroke: "#fff", fill: NEON.purple }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <aside className="space-y-6">
                  {/* Pie Chart */}
                  <div className="bg-gradient-to-tr from-[#041226] to-[#08102a] border border-white/10 rounded-2xl p-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-1">
                      <div className="text-white font-semibold text-center sm:text-left">
                        Condition Split
                      </div>
                      <div className="text-xs text-slate-400 text-center sm:text-right">
                        Proportion of tracked cities
                      </div>
                    </div>
                    <div className="h-[220px] sm:h-[260px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={metrics.conditionSplit}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={48}
                            outerRadius={84}
                            paddingAngle={6}
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {metrics.conditionSplit.map((_, i) => {
                              const colors = [NEON.purple, NEON.cyan, NEON.pink, NEON.yellow];
                              return <Cell key={i} fill={colors[i % colors.length]} />;
                            })}
                          </Pie>
                          <Tooltip wrapperStyle={{ background: "#071126", borderRadius: 8 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Top Cities */}
                  <div className="bg-gradient-to-tr from-[#041226] to-[#08102a] border border-white/10 rounded-2xl p-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-1">
                      <div className="text-white font-semibold text-center sm:text-left">
                        Top Cities Snapshot
                      </div>
                      <div className="text-xs text-slate-400 text-center sm:text-right">
                        Quick glance
                      </div>
                    </div>
                    <div className="space-y-3">
                      {topCities.map((c, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-medium">{c.name}</div>
                            <div className="text-xs text-slate-400">{c.cond}</div>
                          </div>
                          <div className="text-white font-semibold">{c.temp}°C</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </main>
            </>
          )
        )}

        <footer className="mt-10 text-center text-slate-400 text-xs sm:text-sm">
          © {new Date().getFullYear()} Weather Dashboard — Built with ❤️ by Niranjan
        </footer>
      </div>
    </div>
  );
}
