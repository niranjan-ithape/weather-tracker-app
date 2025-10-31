const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: String,
    temperature: Number,
    condition: String,
    humidity: Number,
    windSpeed: Number,
    sunrise: Number,
    sunset: Number,
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const City = mongoose.model("City", citySchema);
module.exports = City;
