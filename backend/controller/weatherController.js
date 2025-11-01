const dotenv = require("dotenv");
dotenv.config();
const City = require("../model/City.js");
const { fetchWeatherData } = require("../utils/fetchWeather.js");
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// GET /api/cities
const getCities = async (req, res) => {
  const cities = await City.find();
  res.json(cities);
};

// POST /api/cities
const addCity = async (req, res) => {
  const { name } = req.body;
  const existing = await City.findOne({ name });
  if (existing) return res.status(400).json({ message: "City already tracked" });

  const weather = await fetchWeatherData(name);
  if (!weather) return res.status(404).json({ message: "City not found" });

  const city = await City.create(weather);
  res.status(201).json(city);
};

// DELETE /api/cities/:id
const deleteCity = async (req, res) => {
  await City.findByIdAndDelete(req.params.id);
  res.json({ message: "City removed" });
};

// GET /api/weather/:city
const getWeatherByCity = async (req, res) => {
  const cityName = req.params.city;
  const weather = await fetchWeatherData(cityName);
  if (!weather) return res.status(404).json({ message: "City not found" });
  res.json(weather);
};

// ✅ FIXED VERSION
// GET /api/weather/cities/suggest?s=query
const searchCities = async (req, res) => {
  try {
    const search = req.query.s?.trim();
    if (!search) return res.json([]);

    // 1️⃣ Search local DB
    const dbResults = await City.find({
      name: { $regex: search, $options: "i" },
    })
      .limit(5)
      .lean();

    // 2️⃣ If not enough results, fetch from OpenWeather
    let apiResults = [];
    if (dbResults.length < 5) {
      const apiResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          search
        )}&limit=5&appid=${OPENWEATHER_API_KEY}`
      );

      const apiData = await apiResponse.json();

      // ✅ Safely handle unexpected responses
      if (Array.isArray(apiData)) {
        apiResults = apiData.map((c) => ({
          name: c.name,
          country: c.country,
          temperature: null,
          condition: "Unknown",
          source: "openweather",
        }));
      } else {
        console.error("⚠️ Unexpected OpenWeather API response:", apiData);
        apiResults = [];
      }
    }

    // 3️⃣ Merge and remove duplicates
    const combined = [
      ...dbResults.map((c) => ({ ...c, source: "database" })),
      ...apiResults.filter(
        (apiCity) => !dbResults.some((dbCity) => dbCity.name === apiCity.name)
      ),
    ];

    // 4️⃣ Send final results
    res.json(combined);
  } catch (error) {
    console.error("❌ Error fetching city suggestions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getCities,
  addCity,
  deleteCity,
  getWeatherByCity,
  searchCities,
};
