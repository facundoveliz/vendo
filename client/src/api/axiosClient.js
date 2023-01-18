import axios from 'axios';
import toast from 'react-hot-toast';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1200000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const cfg = config;
    const token = localStorage.getItem('x-auth-token');
    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
  },
  (error) => console.log(error),
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = '/login';
      }
      if (error.response.data.msg === 'Email already in use') {
        toast.error('Email already in use');
      }
      if (error.response.data.msg === 'Invalid email or password') {
        toast.error('Invalid email or password');
      }
    }
    return console.log(error);
  },
);

export default axiosClient;
