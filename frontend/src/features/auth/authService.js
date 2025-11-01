import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

// Login user
const login = async (userData) => {
  const response = await axios.post("http://localhost:5000/api/auth/signin", userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data)); 
  }

  return response.data;
};

// Get token from localStorage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token;
};

const authService = { login, getToken };
export default authService;
