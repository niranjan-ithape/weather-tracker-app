const express = require("express");
const {
  getCities,
  addCity,
  deleteCity,
  getWeatherByCity,
} = require("../controller/weatherController.js");

const router = express.Router();

router.get("/cities", getCities);
router.post("/cities", addCity);
router.delete("/cities/:id", deleteCity);
router.get("/weather/:city", getWeatherByCity);

module.exports = router;
