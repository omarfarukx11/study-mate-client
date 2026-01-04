import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMoon, FaSun } from "react-icons/fa";

const DasNav = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const theme = darkMode ? "studyMateDark" : "studyMateLight";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="absolute top-0 left-0 w-full z-100 border-b border-base-300 bg-base-100 py-1">
      <div className="px-4 lg:px-8 h-[70px] flex justify-between items-center">
        
        <div className="flex items-center gap-3">
        <label htmlFor="dashboard-sidebar" className="btn btn-ghost btn-sm lg:hidden">
            <GiHamburgerMenu size={24} className="text-primary" />
          </label>
          
          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden text-2xl font-black tracking-tighter">
            Study<span className="text-primary">Mate</span>
          </Link>
          
          {/* Desktop Title */}
          <h2 className="hidden lg:block text-xl font-bold text-neutral">Dashboard</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="btn btn-ghost btn-circle btn-sm">
            {darkMode ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-lg" />}
          </button>

          {/* User Profile Dropdown */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar shadow-sm cursor-pointer">
                <div className="w-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                  <img src={user.photoURL || "/avatar.png"} alt="User" />
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xl border border-base-200 mt-3">
                <li><Link to="/dashboard/profile" className="text-neutral-content">Profile</Link></li>
                <div className="divider my-0"></div>
                <li>
                  <button 
                    onClick={() => logOutUser().then(() => navigate("/"))} 
                    className="text-error font-bold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DasNav;