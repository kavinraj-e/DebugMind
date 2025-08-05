import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Loading from "./components/Loading";
import CreatePost from "./components/CreatePost";
import ViewPost from "./components/ViewPost"; // ✅ NEW: View single post

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/authprofile`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <Loading />;

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />}
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup setUser={setUser} />}
        />

        <Route
          path="/upload"
          element={user ? <CreatePost /> : <Navigate to="/login" replace />}
        />

        <Route path="/post/:id" element={<ViewPost />} />
      </Routes>
    </Router>
  );
}

export default App;
