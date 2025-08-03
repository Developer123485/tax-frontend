import axios from "axios";
import { apiUrl } from "../config";

const api = axios.create({
  baseURL: apiUrl, // our API base URL
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // Assuming you store the token in sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    if (error.request.status == 401) {
      window.sessionStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Export the api instance
export default api;
