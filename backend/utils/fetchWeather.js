const axios = require("axios");

const fetchWeatherData = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    return {
      name: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };
  } catch (error) {
    console.error(`❌ Error fetching weather for ${city}:`, error.message);
    return null;
  }
};

module.exports = { fetchWeatherData };
