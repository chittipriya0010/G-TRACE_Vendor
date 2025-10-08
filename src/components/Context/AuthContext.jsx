import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    // We store minimal, non-sensitive user data for display purposes (e.g., full_name)
    const [user, setUser] = useState(null);  // { id, full_name, email, etc. }
    const [loading, setLoading] = useState(true);

    // Load session (JWT token) on mount
    useEffect(() => {
        // 🚨 CRITICAL CHANGE: Check and load the token
        const storedToken = sessionStorage.getItem("token"); 
        const storedUser = sessionStorage.getItem("user");
        
        if (storedToken && storedUser) {
            try {
                // Set the non-sensitive user data for display
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                // Clear corrupted data
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
            }
        }
        setLoading(false);
    }, []);

    /**
     * Login function.
     * @param {string} token - The JWT received from the backend.
     * @param {object} userData - Non-sensitive user data (id, name, email, etc.).
     */
    const login = (token, userData) => {
        setUser(userData);
        // 🚨 CRITICAL CHANGE: Store the token as the primary session credential
        sessionStorage.setItem("token", token);
        // Store minimal user data for UI display (optional)
        sessionStorage.setItem("user", JSON.stringify(userData)); 
    };

    // Logout function
    const logout = () => {
        setUser(null);
        // 🚨 CRITICAL CHANGE: Remove both token and user data
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    };
    
    // Helper to get the token for API calls
    const getToken = () => sessionStorage.getItem("token");

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming context
export const useAuth = () => {
    return useContext(AuthContext);
};