import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImage from "../../images/girl image.jpg";
import companyLogo from "../../images/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Login attempt:", { email, password, rememberMe });
    // Perform authentication here (mock or real)
    // On success:
    navigate("/cce/not-working");
  };

  return (
    <div className="font-poppins min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="flex bg-white rounded-3xl shadow-lg overflow-hidden max-w-4xl w-full min-h-[600px]">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex flex-col justify-center px-12 py-16">
          {/* Logo */}
          <div className="mb-10">
            <img src={companyLogo} alt="G-TRAC Logo" className="w-30 h-auto block" />
          </div>

          {/* Welcome Text */}
          <div className="mb-10">
            <h1 className="text-4xl font-semibold text-gray-900 mb-2 leading-tight">Welcome Back</h1>
            <h2 className="text-4xl font-semibold text-gray-900 mb-4 leading-tight">Please Sign In</h2>
            <p className="text-gray-500 text-sm font-normal">Please enter your details below</p>
          </div>

          {/* Email Field */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg select-none">✉</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@gmail.com"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-sm bg-white outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg select-none">🔒</div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl text-sm bg-white outline-none focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none text-lg"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between mb-8 items-center">
            <label className="flex items-center text-gray-500 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 w-4 h-4 rounded accent-blue-500 cursor-pointer"
              />
              Remember Me
            </label>
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
          >
            LOGIN <span className="text-xl">→</span>
          </button>
        </div>

        {/* Right Side - Illustration */}
        <div className="flex-1 bg-gradient-to-tr from-sky-100 to-sky-200 flex items-center justify-center p-10 relative">
          <div className="bg-white rounded-2xl p-5 shadow-lg max-w-xs w-full relative">
            {/* Browser Header */}
            <div className="flex gap-1 mb-5 border-b border-gray-200 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <img src={girlImage} alt="Girl Illustration" className="w-full rounded-2xl object-cover" />
          </div>
          <div className="w-4 h-2 rounded bg-amber-900 mt-2 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;