import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/pages/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/authprofile`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Redirect root to home or login */}
        <Route path="/" element={
          isAuthenticated ? <Home /> : <Navigate to="/login" />
        } />

        {/* If logged in, prevent access to login/signup */}
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/" /> : <Signup />
        } />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <Login />
        } />
      </Routes>
    </Router>
  );
}

export default App;
