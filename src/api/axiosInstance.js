import axios from "axios";

/**
 * Helper function to get the token from both storage locations.
 * CRITICAL FIX: Ensures token is retrieved whether it was saved to 
 * localStorage (Remember Me) or sessionStorage (session-only).
 */
const getToken = () => {
    // Check localStorage first, then fallback to sessionStorage
    return localStorage.getItem("token") || sessionStorage.getItem("token");
};

const axiosInstance = axios.create({
    baseURL: "https://gtracerp-backend.onrender.com/",
    timeout: 10000,
});

// 1. 🚀 REQUEST Interceptor (Add the JWT Token)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();

        // Check if a token exists and if the request is NOT the login endpoint
        if (token && config.url !== "/login") {
            // Set the Authorization header with the Bearer scheme
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. 🛑 RESPONSE Interceptor (Clean up login logic)
axiosInstance.interceptors.response.use(
    (response) => {
        // Session storage is handled by the component that calls useAuth().login()
        return response;
    },
    (error) => {
        // Optional: Handle 401 Unauthorized errors globally
        if (error.response?.status === 401) {
            console.error("Authentication Error: Token is invalid or expired.");
            // Consider redirecting to login here if using a global handler.
        }
        return Promise.reject(error.response?.data || error);
    }
);

export default axiosInstance;
