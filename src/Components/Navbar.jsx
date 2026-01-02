import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMoon, FaSun } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoHomeOutline } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";
import { FaUsersViewfinder } from "react-icons/fa6";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "studyMateDark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "studyMateLight");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "No, stay logged in",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser()
          .then(() => {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Log Out Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          })
          .catch((error) => console.error(error));
      }
    });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/findPartner"> Find Partners</NavLink>
      </li>
      <li>
        <NavLink to="/aboutUs"> About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contract">Contract Us</NavLink>
      </li>
    </>
  );
  return (
   <nav className="w-full bg-base-100 py-6 flex items-center shadow-sm fixed top-0 z-100 left-0 right-0 transition-colors duration-300 px-4 lg:px-10">
  <div className="w-full max-w-[1536px] mx-auto flex justify-between items-center">
    <div className="shrink-0">
      <h1 className="text-2xl lg:text-4xl font-bold text-neutral-content">
        Study<span className="text-primary">Mate</span>
      </h1>
    </div>
    <div className="hidden lg:flex items-center">
      <ul className="flex gap-8 text-lg font-semibold text-neutral-content">
        {links}
      </ul>
    </div>
    <div className="flex items-center gap-3 lg:gap-5">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="hidden lg:flex p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-300"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
      {user && (
        <NavLink 
          to="/dashboard" 
          className="btn btn-primary btn-sm lg:btn-md rounded-sm hidden md:flex"
        >
          Dashboard
        </NavLink>
      )}
      {user && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar">
            <div className="w-8 lg:w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.photoURL} alt="User" />
            </div>
          </div>
          <ul tabIndex={0} className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2 flex flex-col">
            <li><Link to="/profile" className="btn btn-outline btn-primary btn-sm w-full">Profile</Link></li>
            <li><button onClick={handleLogout} className="btn btn-primary btn-sm w-full">LogOut</button></li>
          </ul>
        </div>
      )}
      <div className="flex lg:hidden items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          {darkMode ? <FaSun size={14}/> : <FaMoon size={14}/>}
        </button>
        
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0">
            <GiHamburgerMenu size={24} />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-neutral-content">
            {links}
            {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
          </ul>
        </div>
      </div>

    </div>
  </div>
</nav>
  );
};

export default Navbar;
