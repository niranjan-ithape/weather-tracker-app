const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const cors = require("cors");

dotenv.config();
connectDB();
 
const app = express();
app.use(express.json()); // Parse JSON

app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // optional if you use cookies/auth
}));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
