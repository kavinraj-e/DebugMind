import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/pngwing.com.png";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData,{withCredentials:true});
      navigate("/");
    } catch (error) {
      alert("Login failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="hidden md:flex w-1/2 items-center justify-center p-6">
        <img src={logo} alt="Login Illustration" className="w-3/4 max-w-sm object-contain" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-10">
        <div className="mb-8 md:hidden text-center">
          <img src={logo} alt="Logo" className="mx-auto w-16 h-16 mb-3" />
          <h2 className="text-2xl font-bold text-black">🚀 Welcome to DebugMind</h2>
          <p className="text-gray-600 text-sm mt-1">Login to continue your journey</p>
        </div>

        <div className="hidden md:block">
          <h2 className="text-3xl font-bold text-black">Welcome back!</h2>
          <p className="text-gray-600 mt-2 mb-8">Login to continue using DebugMind</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#e3572b] text-white py-2 text-lg rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-6 text-gray-700 text-center md:text-left">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
