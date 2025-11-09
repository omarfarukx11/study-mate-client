import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import { FcMenu } from "react-icons/fc";

const Navbar = () => {
  const {user ,logOutUser} = use(AuthContext)

  const handleLogout = () => {
    logOutUser()
    .then(() => {
      alert('log out success')
    }
    )
    .catch(error => error)
  }
  

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
        
        </>
      )}
    </>
  );

  return (
   <nav className="w-[100vw] bg-base-100 h-[100px] flex items-center shadow-sm fixed top-0 z-10 left-0 right-0">
     <div className="flex justify-between items-center w-[1240px] mx-auto ">
      <div className="">
        <a className="btn btn-ghost text-xl">Study Mate</a>
      </div>


      <div className=" hidden lg:flex">
        <ul className="flex justify-between gap-5">
         {
            links
         }
        </ul>
         {
          user && 
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                    <img 
                    src={user.photoURL}
                    alt="User"
                    className="w-[50px] h-[50px] rounded-full"
                    />
              </div>
          <ul tabIndex="-1" className="dropdown-content flex flex-col bg-base-100 rounded-box z-1 w-52 p-4 shadow-sm">
            <li className="btn bg-[#5BBC2E] text-white hover:bg-white hover:border-2 hover:border-[#5BBC2E] hover:text-[#5BBC2E] "><Link className="no-style-link" to={'/profile'}>Profile</Link></li>
            <li className="btn bg-[#5BBC2E] text-white hover:bg-white hover:border-2 hover:border-[#5BBC2E] hover:text-[#5BBC2E]" onClick={handleLogout}>LogOut</li>
          </ul>
        </div>
         }
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
