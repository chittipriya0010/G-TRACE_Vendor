import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImage from "../../images/girl.png";
import companyLogo from "../../images/logo.png";
import axiosInstance from "../../api/axiosInstance";
import { Mail, LockKeyhole, Eye, EyeOff, ArrowRight, X } from "lucide-react";
import { useAuth } from "../Context/AuthContext";

const LoginPage = () => {
    // You could initialize email/password states from localStorage for convenience 
    // but generally, we only persist the authentication state (token/user data).
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    // Assuming useAuth provides a 'login' function that can accept a persistence flag
    const { login } = useAuth();

    const displayError = (message) => setErrorMessage(message);

    // Helper to normalize role string (lowercase, no spaces) to match switch cases
    const normalizeRole = (r) => r?.toLowerCase().replace(/\s/g, "");

    const handleSubmit = async () => {
        if (!email || !password) return displayError("⚠ Email and password are required!");

        setIsSubmitting(true);
        setErrorMessage(""); // Clear previous errors

        try {
            const response = await axiosInstance.post("/login", { email, password });
            const user = response.data; 
            
            // Extract the token and all other user data
            const { token, permissions: userPermissionsRaw, ...restUserData } = user;
            
            // Safely parse permissions
            const userPermissions = Array.isArray(userPermissionsRaw)
                ? userPermissionsRaw
                : JSON.parse(userPermissionsRaw || "[]");

            const userData = {
                ...restUserData, // Includes id, full_name, email, role, teamId, branchId
                permissions: userPermissions,
            };

            // 🌟 CRITICAL CHANGE: Pass the 'rememberMe' boolean to the login function.
            // Your AuthContext's login function must use this flag to decide 
            // whether to store the token in localStorage (Remember Me) or sessionStorage (Session only).
            login(token, userData, rememberMe); 

            console.log("✅ Logged in user data:", userData);

            // Normalize the role name from the backend before routing
            const normalizedUserRole = normalizeRole(user.role);

            let route = "/unauthorized"; // fallback
            switch (normalizedUserRole) {
                case "sales": 
                    route = "/sales";
                    break;
                case "salesadmin": 
                    route = "/sales/admin-sales";
                    break;
                case "cce": 
                    route = "/cce/view-install-request";
                    break;
                case "cceadmin": 
                    route = "/cce/install-admin";
                    break;
                case "stocks":
                    route = "/stocks";
                    break;
                case "vendors":
                    route = "/vendors";
                    break;
                case "dispatch":
                    route = "/dispatch/service-assign-engineer";
                    break;
                default:
                    route = "/unauthorized";
            }

            navigate(route);
        } catch (error) {
            // Check if error response exists and handle unauthorized specifically
            const message = error.response?.data?.message || 
                            (error.response?.status === 401 ? "Invalid email or password." : "Login failed. Please check your credentials.");
            displayError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="font-sans h-full bg-gray-50 flex items-center justify-center p-4 sm:p-8">
            <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">

                {/* Left Side: Login Form */}
                <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 sm:py-16">
                    <div className="mb-10 sm:mb-12">
                        <div className="flex items-center mb-8">
                            <img src={companyLogo} alt="Logo" className="w-36 h-16 mr-5 scale-70" />
                        </div>
                        <h1 className="text-4xl font-semibold text-gray-900 mb-2 leading-tight">Welcome Back</h1>
                        <h1 className="text-4xl font-semibold text-gray-900 leading-tight">Please Sign In</h1>
                        <p className="text-gray-500 text-base font-normal mt-2">Please enter your details below</p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
                        {errorMessage && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex justify-between items-center text-sm" role="alert">
                                <span>{errorMessage}</span>
                                <button onClick={() => setErrorMessage("")} className="p-1 rounded-full hover:bg-red-200 transition" aria-label="Close alert">
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="login@gmail.com"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-base bg-white outline-none transition duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">Password</label>
                            <div className="relative">
                                <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg text-base bg-white outline-none transition duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition p-1"
                                    aria-label="Toggle Password Visibility"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        {/* Remember Me */}
                        <div className="flex justify-between items-center pt-2 text-sm">
                            <label className="flex items-center text-gray-600 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="mr-2 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                                />
                                Remember Me
                            </label>
                            <a href="#" className="text-gray-500 hover:text-gray-700 transition font-medium underline">Forgot Password?</a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3.5 rounded-lg font-bold text-lg shadow-md shadow-blue-500/50 transition duration-300 transform hover:scale-[1.005] active:scale-[0.99] flex items-center justify-center space-x-2 mt-8 disabled:opacity-70`}
                        >
                            {isSubmitting ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    <span className="uppercase">Login</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Right Side Illustration */}
                <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative overflow-hidden rounded-r-3xl" style={{ backgroundColor: '#80A3FF' }}>
                    <img src={girlImage} alt="Illustration" className="w-full max-w-sm object-cover drop-shadow-2xl z-10" />
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
