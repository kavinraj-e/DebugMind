import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { MdBugReport } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

function Navbar({ user, setUser }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleUpload = () => navigate("/upload");

  if (["/login", "/signup"].includes(location.pathname)) return null;

  return (
    <nav className="w-full h-16 fixed top-0 z-50 bg-white shadow-sm flex items-center">
      <div className="w-full flex items-center justify-between px-6 sm:px-12 lg:px-[8%] xl:px-[12%] 2xl:px-[15%]">
        <Link to="/" className="text-blue-600 hover:scale-110 transition-transform">
          <MdBugReport size={30} />
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="w-9 h-9 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center font-bold text-sm"
          >
            {user ? user.name?.charAt(0).toUpperCase() : <FaUserCircle size={24} />}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 px-4 text-sm z-20 space-y-2">
              {user ? (
                <>
                  <p className="font-medium text-gray-800">Hi👋 {user.name}</p>
                  <button onClick={handleUpload} className="text-blue-500 hover:underline block w-full text-left">Upload</button>
                  <button onClick={handleLogout} className="text-red-500 hover:underline block w-full text-left">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/login")} className="text-blue-500 hover:underline block w-full text-left">Login</button>
                  <button onClick={() => navigate("/signup")} className="text-blue-500 hover:underline block w-full text-left">Signup</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
