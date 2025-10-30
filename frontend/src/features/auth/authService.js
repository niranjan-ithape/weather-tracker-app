import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data)); // includes token
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
