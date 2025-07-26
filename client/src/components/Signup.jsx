import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/pngwing.com.png";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
      navigate("/login");
    } catch (error) {
      alert("Signup failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="hidden md:flex w-1/2 items-center justify-center p-6">
        <img src={logo} alt="Signup Illustration" className="w-3/4 max-w-sm object-contain" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-10">
        <div className="mb-8 md:hidden text-center">
          <img src={logo} alt="Logo" className="mx-auto w-16 h-16 mb-3" />
          <h2 className="text-2xl font-bold text-black">📝 Join DebugMind</h2>
          <p className="text-gray-600 text-sm mt-1">Create your account below</p>
        </div>

        <div className="hidden md:block">
          <h2 className="text-3xl font-bold text-black">Create an Account</h2>
          <p className="text-gray-600 mt-2 mb-8">Sign up to start publishing on DebugMind</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-6 text-gray-700 text-center md:text-left">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}