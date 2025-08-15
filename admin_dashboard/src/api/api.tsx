// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/", // backend base URL
});

// Intercept every response
api.interceptors.response.use(
  (response) => response, error => {
    console.log('API Error intercepted##:', error, "##");
    // If backend says Unauthorized
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('Error in api:', error);
      // Clear any stored token
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // add delay of 3s
      setTimeout(() => {
        // Only redirect if not already on login page to prevent loops
        if (!window.location.pathname.includes('/login')) {
          console.log('Redirecting to login page due to 401');
          // Redirect to login
          window.location.href = "/login";
        }
      }, 1000);
    } else if (error.response?.status === 404) {
      alert(error.response.data.message || 'Resource not found, using old data.');
    }
    return Promise.reject(error);
  }
);

export default api;
