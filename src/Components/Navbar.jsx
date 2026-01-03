import React, { useContext, useState, useEffect, useRef } from "react"; // Added useRef
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMoon, FaSun } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // New state for Profile Dropdown
  const profileRef = useRef(null); // Ref to detect clicks outside
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Theme Logic
  useEffect(() => {
    const theme = darkMode ? "studyMateDark" : "studyMateLight";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsSidebarOpen(false);
    setIsProfileOpen(false); // Close profile menu on logout
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser().then(() => {
          Swal.fire("Logged Out", "Success", "success");
          navigate("/");
        });
      }
    });
  };

  const links = (
    <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/findPartner">Find Partners</NavLink></li>
    <li><NavLink to="/aboutUs">About</NavLink></li>
    <li><NavLink to="/contract">Contact Us</NavLink></li>
    <li><NavLink to="/blogs">Blogs</NavLink></li>
      {
        user && <>
        <li><NavLink to="/dashboard/myConnection">My Connection</NavLink></li>
        <li><NavLink to="/dashboard/create-partner">Create Partner</NavLink></li>
        </>
      }
   
      
      
    </>
  );

  return (
    <>
      <nav className="w-full bg-base-100 py-5 flex items-center shadow-md fixed top-0 z-80 left-0 right-0 px-4 lg:px-10">
        <div className="w-full max-w-[1536px] mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl lg:text-3xl font-bold text-neutral-content"
          >
            Study<span className="text-primary">Mate</span>
          </Link>

          {/* <div className="hidden xl:flex items-center gap-3 text-lg font-semibold"></div> */}
          
          <li className="xl:flex gap-5 list-none hidden text-neutral-content">
            {
              links
            }
          </li>

          <div className="flex items-center gap-4">
            {!user && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="hidden xl:block text-xl"
              >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
              </button>
            )}

            {user && (
              <button>
                <NavLink to="/dashboard" className="btn btn-primary rounded-4xl hover:bg-neutral border-none btn-sm">
                  Dashboard
                </NavLink>
              </button>
            )}
            {user ? (
              <div
                className="hidden xl:flex items-center gap-4 relative"
                ref={profileRef}
              >
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={user?.photoURL}
                    className="w-10 h-10 rounded-full ring-2 ring-primary cursor-pointer transition-transform active:scale-95"
                    alt="Profile"
                  />
                </button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 top-12 w-56 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl border border-slate-200 dark:border-zinc-800 p-2 z-[100] flex flex-col gap-1"
                    >
                      <div className="px-4 py-3 border-b dark:border-zinc-800 mb-1">
                        <p className="text-sm font-bold truncate capitalize">
                          {user?.displayName}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <NavLink
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="px-4 py-2 hover:bg-primary/10 rounded-lg text-sm transition-colors"
                      >
                        My Profile
                      </NavLink>

                      {/* Theme Toggle inside Profile */}
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex items-center justify-between px-4 py-2 hover:bg-primary/10 rounded-lg text-sm transition-colors"
                      >
                        {darkMode ? "Light" : "Dark"}
                        {darkMode ? (
                          <FaSun className="text-yellow-400" />
                        ) : (
                          <FaMoon />
                        )}
                      </button>

                      <hr className="my-1 border-slate-100 dark:border-zinc-800" />

                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-left text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/Login" className="btn btn-primary rounded-4xl hover:bg-neutral border-none btn-sm">
                Sign In
              </Link>
            )}

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="xl:hidden text-primary p-2"
            >
              <GiHamburgerMenu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar remains exactly as it was */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed right-0 top-0 h-screen w-72 bg-white dark:bg-zinc-900 z-100 shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b dark:border-zinc-800">
                <img
                  src={user?.photoURL}
                  className="w-10 h-10 rounded-full ring-2 ring-primary cursor-pointer transition-transform active:scale-95"
                  alt="Profile"
                />
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-primary"
                >
                  <CgCloseO size={30} />
                </button>
              </div>

              <div className="flex flex-col p-6 gap-6 text-lg font-medium">
               <ul>
                {
                  links
                }
               </ul>

                {user && (
                  <>
                    <hr className="border-zinc-200 dark:border-zinc-800" />
                    <NavLink
                      onClick={() => setIsSidebarOpen(false)}
                      to="/profile"
                      className={'btn btn-primary'}
                    >
                      My Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="btn bg-red-500 text-white"
                    >
                      Logout
                    </button>
                  </>
                )}

                {!user && (
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to="/Login"
                    className="btn btn-primary w-full mt-4"
                  >
                    Sign In
                  </Link>
                )}
              </div>

              <div className="mt-auto p-6 border-t dark:border-zinc-800 flex items-center justify-between">
                <span className="text-sm">Appearance</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg"
                >
                  {darkMode ? (
                    <FaSun className="text-yellow-400" />
                  ) : (
                    <FaMoon />
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
