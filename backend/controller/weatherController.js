const City = require("../models/City.js");
const { fetchWeatherData } = require("../utils/fetchWeather.js");

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

module.exports = {
  getCities,
  addCity,
  deleteCity,
  getWeatherByCity,
};
