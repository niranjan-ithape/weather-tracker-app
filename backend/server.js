const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cron = require("node-cron");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const City = require("./model/City.js");
const { fetchWeatherData } = require("./utils/fetchWeather.js");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Scheduled Cron Job (Every Hour)
cron.schedule("0 * * * *", async () => {
  try {
    console.log("⏰ Updating weather data...");

    const cities = await City.find();
    for (const city of cities) {
      const data = await fetchWeatherData(city.name);
      if (data) {
        await City.updateOne(
          { _id: city._id },
          { ...data, lastUpdated: new Date() }
        );
      }
    }

    console.log("✅ Weather data updated successfully!");
  } catch (error) {
    console.error("❌ Error updating weather data:", error.message);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
