# weather-tracker-app
🌦️ A full-stack MERN web application that displays real-time weather information for multiple cities. Built with React, Node.js, Express, and MongoDB using the OpenWeather API.

🚀 How to Run This Project Locally
1. Clone the Repository
cd Desktop
git clone https://github.com/niranjan-ithape/weather-tracker-app.git

2. Open in VS Code

Open the folder weather-tracker-app in Visual Studio Code.

3. Setup Backend .env

Go to the backend folder and create a .env file with the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=superSecretKey123
PORT=5000
OPENWEATHER_API_KEY=your_openweather_api_key


⚙️ Replace these values with your real credentials.

4. Run Frontend
cd frontend
npm install
npm run dev

5. Run Backend

Open a new terminal and run:

cd backend
npm install
npm run dev

✅ Final Steps

Make sure your .env file is correctly set up before running the backend.

Frontend usually runs at: http://localhost:5173

Backend usually runs at: http://localhost:5000
