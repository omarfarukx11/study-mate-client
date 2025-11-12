import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import { FcMenu } from "react-icons/fc";
import { FaMoon, FaSun } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Log Out Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => error);
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#5BBC2E] font-bold"
              : "text-gray-800 hover:text-[#5BBC2E] transition-colors duration-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/findPartner"
          className={({ isActive }) =>
            isActive
              ? "text-[#5BBC2E] font-bold"
              : "text-gray-800 hover:text-[#5BBC2E] transition-colors duration-300"
          }
        >
          Find Partners
        </NavLink>
      </li>

      {!user && (
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-[#5BBC2E] font-bold"
                : "text-gray-800 hover:text-[#5BBC2E] transition-colors duration-300"
            }
          >
            Login
          </NavLink>
        </li>
      )}

      {user && (
        <>
          <li>
            <NavLink
              to="/createPP"
              className={({ isActive }) =>
                isActive
                  ? "text-[#5BBC2E] font-bold"
                  : "text-gray-800 hover:text-[#5BBC2E] transition-colors duration-300"
              }
            >
              Create Partner Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myConnection"
              className={({ isActive }) =>
                isActive
                  ? "text-[#5BBC2E] font-bold"
                  : "text-gray-800 hover:text-[#5BBC2E] transition-colors duration-300"
              }
            >
              My Connections
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="w-full bg-white h-[100px] flex items-center shadow-sm fixed top-0 z-10 left-0 right-0 transition-colors duration-300">
      <div className="flex justify-between items-center px-5 w-full max-w-[1536px] mx-auto">
        <h1 className="btn btn-ghost text-3xl">
          Study<span className="text-[#5BBC2E]">Mate</span>
        </h1>

        <div className="hidden lg:flex items-center justify-center gap-5">
          <ul className="flex justify-between gap-5 text-lg font-semibold">
            {links}
          </ul>

          {/* Theme Toggle Button (non-functional) */}
          <button className="p-2 rounded-full bg-gray-200 text-gray-700">
            <FaMoon />
          </button>

          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-[50px] h-[50px] rounded-full"
                />
              </div>
              <ul className="dropdown-content flex flex-col bg-white rounded-box z-10 w-52 p-3 gap-2 shadow-sm">
                <li>
                  <Link
                    to={"/profile"}
                    className="w-full px-4 py-2 rounded-sm hover:bg-[#5BBC2E] hover:text-white transition-colors duration-300"
                  >
                    Profile
                  </Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded-sm hover:bg-[#5BBC2E] hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  LogOut
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="lg:hidden">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FcMenu />
            </div>
            <ul className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2 gap-2 shadow">
              {links}
              <li>
                <button className="w-full px-4 py-2 rounded-sm bg-gray-200 text-gray-700 flex items-center justify-center gap-2">
                  <FaMoon /> Theme
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
