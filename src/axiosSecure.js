
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

// Optional: Add interceptors
axiosSecure.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized access - redirecting or logging out...");

    }
    return Promise.reject(error);
  }
);

export default axiosSecure;
