import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMoon, FaSun } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });


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
      title: 'Are you sure?',
      text: "Do you want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'No, stay logged in'
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser()
          .then(() => {
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Log Out Successful',
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
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/findPartner">Find Partners</NavLink></li>

      {!user && (
        <>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
        </>
      )}

      {user && (
        <>
          <li><NavLink to="/createPP">Create Partner Profile</NavLink></li>
          <li><NavLink to="/myConnection">My Connections</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className="w-full bg-base-100 dark:bg-base-100 h-[100px] flex items-center shadow-sm fixed top-0 z-10 left-0 right-0 transition-colors duration-300">
      <div className="flex justify-between items-center lg:px-0 px-5 w-full 2xl:w-[1536px] mx-auto">
        <h1 className="text-4xl font-bold text-neutral-content">
          Study<span className="text-primary">Mate</span>
        </h1>

        <div className="hidden lg:flex items-center ml-auto justify-end gap-5">
          <ul className="flex justify-between gap-5 text-lg font-semibold text-neutral-content">
            {links}
          </ul>


          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full  bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-300"
          >
            {darkMode ? <FaSun className="" /> : <FaMoon />}
          </button>

          {user && (
            <div className="dropdown dropdown-end ">
              <div tabIndex={0} role="button">
                <img src={user.photoURL} alt="User" className="w-[30px] h-[30px] rounded-full" />
              </div>
              <ul className="dropdown-content flex flex-col bg-base-100 dark:bg-base-100 rounded-box z-10 w-52 p-3 gap-2 shadow-sm">
                <li>
                  <Link
                    to={"/profile"}
                    className="btn w-full text-primary border border-primary px-4 py-2 rounded-sm hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    Profile
                  </Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="btn w-full text-primary border border-primary px-4 py-2 rounded-sm hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  LogOut
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 lg:gap-5">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 lg:hidden transition-colors duration-300"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {user && (
            <img src={user.photoURL} alt="User" className="lg:w-[45px] lg:h-[45px] w-[20px] h-[20px] rounded-full lg:hidden" />
          )}

          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost text-sm sm:text-lg text-neutral-content">
              <GiHamburgerMenu />
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 dark:bg-base-100 rounded-box z-10 mt-3 w-52 p-2 gap-2 shadow text-neutral-content">
              {links}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
