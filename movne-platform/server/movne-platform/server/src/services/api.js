import axios from 'axios';

// Create an API instance with defaults
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth (if needed later)
api.interceptors.request.use(
  (config) => {
    // You can add auth token here when implemented
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
