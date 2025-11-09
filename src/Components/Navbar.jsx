import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import { FcMenu } from "react-icons/fc";

const Navbar = () => {
  const {user} = use(AuthContext)
     const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/findPartner">Find Partners</NavLink></li>

      {!user && (
        <>
          <li><NavLink to="/login">Login</NavLink></li>
        </>
      )}

      {user && (
        <>
          <li><NavLink to="/createPP">Create Partner Profile</NavLink></li>
          <li><NavLink to="/myConnection">My Connections</NavLink></li>
          <li>
           
          </li>
          <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                    <img 
                    src={user.photoURL}
                    alt="User"
                    className="w-[60px] h-[60px] rounded-full"
                    />
              </div>
          <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li><Link to={'/profile'}>Profile</Link></li>
            <li>LogOut</li>
          </ul>
        </div>
        </>
      )}
    </>
  );

  return (
   <nav className="w-[100vw] bg-base-100 shadow-sm fixed top-0 z-10 left-0 right-0">
     <div className="flex justify-between items-center w-[1240px] mx-auto ">
      <div className="">
        <a className="btn btn-ghost text-xl">Study Mate</a>
      </div>


      <div className=" hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
         {
            links
         }
        </ul>
      </div>

         <div className=" lg:hidden ">
       <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FcMenu></FcMenu>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {
                links
            }
          </ul>
        </div>
         </div>
    </div>
   </nav>
  );
};

export default Navbar;
