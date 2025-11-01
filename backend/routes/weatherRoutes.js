const express = require("express");
const {
  getCities,
  addCity,
  deleteCity,
  getWeatherByCity,
  searchCities
} = require("../controller/weatherController.js");

const router = express.Router();

router.get("/cities", getCities);
router.post("/cities", addCity);
router.delete("/cities/:id", deleteCity);
router.get("/cities/suggest", searchCities);
router.get("/cities/:city", getWeatherByCity);

module.exports = router;
