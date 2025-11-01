import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,PieChart,Pie,Cell, } from "recharts";
import {MapPin,Thermometer,Flame,Snowflake,Cloud,Droplet,Wind,Clock,} from "lucide-react";
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
    className="relative rounded-2xl p-4 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.03),transparent)] border border-white/6 shadow-[0_8px_30px_rgba(124,58,237,0.08)]"
    style={{
      boxShadow: `0 6px 24px rgba(2,6,23,0.6), 0 0 18px ${accent}33`,
      backdropFilter: "blur(8px)",
    }}
  >
    <div className="flex items-start gap-3">
      <div
        className="p-3 rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
          border: `1px solid ${accent}44`,
        }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wide text-slate-300">{title}</div>
        <div className="text-2xl font-bold text-white mt-1">{value}</div>
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        inset: "-1px",
        borderRadius: 12,
        pointerEvents: "none",
        boxShadow: `0 0 40px ${accent}55 inset`,
        opacity: 0.5,
      }}
    />
  </motion.div>
);

export default function FuturisticWeatherDashboard() {
  //mock data: replace these with real API data
  const [metrics, setMetrics] = useState({
    totalCities: 12,
    avgTemp: 28.4,
    hottestCity: "Delhi",
    hottestTemp: 38,
    coldestCity: "Shimla",
    coldestTemp: 15,
    globalCondition: "Mostly Cloudy",
    avgHumidity: 73,
    avgWind: 12,
    lastUpdated: new Date().toLocaleString(),
  });

  const trendData = [
    { day: "Mon", avg: 27 },
    { day: "Tue", avg: 28 },
    { day: "Wed", avg: 26 },
    { day: "Thu", avg: 29 },
    { day: "Fri", avg: 28 },
    { day: "Sat", avg: 30 },
    { day: "Sun", avg: 29 },
  ];

  const conditionSplit = [
    { name: "Cloudy", value: 6 },
    { name: "Sunny", value: 3 },
    { name: "Rainy", value: 2 },
    { name: "Storm", value: 1 },
  ];

  //keep lastUpdated fresh (demo)
  useEffect(() => {
    const t = setInterval(
      () => setMetrics((m) => ({ ...m, lastUpdated: new Date().toLocaleString() })),
      60_000
    );
    return () => clearInterval(t);
  }, []);

  //small shimmer anim for headers
  const headerMotion = { initial: { y: -8, opacity: 0 }, animate: { y: 0, opacity: 1 } };
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  return (
    <div className="min-h-screen p-6" style={{ background: "linear-gradient(180deg,#031029 0%, #071233 50%, #081026 100%)" }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.header {...headerMotion} transition={{ duration: 0.5 }} className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div style={{ background: `linear-gradient(135deg, ${NEON.purple}, ${NEON.cyan})` }} className="p-3 rounded-2xl shadow-[0_10px_30px_rgba(7,89,133,0.25)]">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor={NEON.cyan} />
                      <stop offset="1" stopColor={NEON.purple} />
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="10" stroke="url(#g1)" strokeWidth="1.6" />
                  <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white tracking-tight">Weather Dashboard</div>
                <div className="text-sm text-slate-300">weather analytics</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-300">Auto-update: every hour</div>
              <div onClick={handleProfileClick} className="px-3 py-2 rounded-lg bg-white/4 text-white text-sm">Profile</div>
            </div>
          </div>
        </motion.header>

        {/* GRID: top stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatPod
            icon={<MapPin size={20} className="text-white" />}
            title="Total Cities"
            value={metrics.totalCities}
            accent={NEON.cyan}
          />
          <StatPod
            icon={<Thermometer size={20} className="text-white" />}
            title="Average Temp"
            value={`${metrics.avgTemp}°C`}
            accent={NEON.purple}
          />
          <StatPod
            icon={<Flame size={20} className="text-white" />}
            title="Hottest City"
            value={`${metrics.hottestCity}`}
            accent={NEON.pink}
          />
          <StatPod
            icon={<Snowflake size={20} className="text-white" />}
            title="Coldest City"
            value={`${metrics.coldestCity}`}
            accent={NEON.cyan}
          />
          <StatPod
            icon={<Cloud size={20} className="text-white" />}
            title="Global Condition"
            value={metrics.globalCondition}
            accent={NEON.purple}
          />
          <StatPod
            icon={<Droplet size={20} className="text-white" />}
            title="Average Humidity"
            value={`${metrics.avgHumidity}%`}
            accent={NEON.cyan}
          />
          <StatPod
            icon={<Wind size={20} className="text-white" />}
            title="Average Wind"
            value={`${metrics.avgWind} km/h`}
            accent={NEON.pink}
          />
          <StatPod
            icon={<Clock size={20} className="text-white" />}
            title="Last Updated"
            value={metrics.lastUpdated}
            accent={NEON.yellow}
          />
        </section>

        {/* Charts + snapshot area */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-tr from-[#051124] to-[#07112a] border border-white/6 rounded-2xl p-5 shadow-[0_20px_60px_rgba(3,6,23,0.6)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-white font-semibold">Temperature Trends</div>
                <div className="text-sm text-slate-400">Weekly average • hover the line for details</div>
              </div>
              <div className="text-sm text-slate-300">Last refreshed: {metrics.lastUpdated}</div>
            </div>

            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  {/* gradient stroke */}
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={NEON.cyan} stopOpacity={1} />
                      <stop offset="100%" stopColor={NEON.purple} stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={NEON.purple} stopOpacity={0.18} />
                      <stop offset="100%" stopColor={NEON.cyan} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip wrapperStyle={{ background: "#0b1220", borderRadius: 8 }} contentStyle={{ border: "none" }} />

                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="url(#lineGrad)"
                    strokeWidth={3}
                    dot={{ r: 4, stroke: "#fff", strokeWidth: 1.2, fill: NEON.purple }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-gradient-to-tr from-[#041226] to-[#08102a] border border-white/6 rounded-2xl p-4 shadow-[0_18px_48px_rgba(3,6,23,0.6)]">
              <div className="flex items-center justify-between mb-3">
                <div className="text-white font-semibold">Condition Split</div>
                <div className="text-xs text-slate-400">Proportion of tracked cities</div>
              </div>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conditionSplit}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={48}
                      outerRadius={84}
                      paddingAngle={6}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {conditionSplit.map((entry, i) => {
                        const colors = [NEON.purple, NEON.cyan, NEON.pink, NEON.yellow];
                        return <Cell key={`c-${i}`} fill={colors[i % colors.length]} />;
                      })}
                    </Pie>
                    <Tooltip wrapperStyle={{ background: "#071126", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gradient-to-tr from-[#041226] to-[#08102a] border border-white/6 rounded-2xl p-4 shadow-[0_18px_48px_rgba(3,6,23,0.6)]">
              <div className="flex items-center justify-between mb-3">
                <div className="text-white font-semibold">Top Cities Snapshot</div>
                <div className="text-xs text-slate-400">Quick glance</div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Delhi", temp: 38, cond: "Sunny" },
                  { name: "Mumbai", temp: 31, cond: "Cloudy" },
                  { name: "Chennai", temp: 33, cond: "Sunny" },
                  { name: "Bangalore", temp: 26, cond: "Cloudy" },
                ].map((c, idx) => (
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

        {/* footer */}
        <footer className="mt-10 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()}  Weather Dashboard — Built with ❤️ by Niranjan
        </footer>
      </div>
    </div>
  );
}
