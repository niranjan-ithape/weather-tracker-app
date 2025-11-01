const express = require("express");
const { auth } = require("../auth/authMiddleware.js");
const {
  getCities,
  addCity,
  deleteCity,
  getWeatherByCity,
  searchCities
} = require("../controller/weatherController.js");

const router = express.Router();

router.get("/cities", auth, getCities);
router.post("/cities", auth, addCity);
router.delete("/cities/:id", auth, deleteCity);
router.get("/cities/suggest", auth, searchCities);
router.get("/cities/:city", auth, getWeatherByCity);

module.exports = router;
