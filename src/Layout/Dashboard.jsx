import React from "react";
import DasNav from "../Components/DasNav";
import { Link, NavLink, Outlet } from "react-router";
import { LuLayoutDashboard, LuUsers, LuUserPlus } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";

const Dashboard = () => {
  const links = (
    <div className="flex flex-col gap-2">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            isActive
              ? "bg-primary text-white"
              : "text-neutral hover:bg-base-300"
          }`
        }
      >
        <AiOutlineHome size={20} />{" "}
        <span className="font-medium">Back Home</span>
      </NavLink>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            isActive
              ? "bg-primary text-white"
              : "text-neutral hover:bg-base-300"
          }`
        }
      >
        <LuLayoutDashboard size={20} />{" "}
        <span className="font-medium">Profile</span>
      </NavLink>
      <NavLink
        to="/dashboard/myConnection"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            isActive
              ? "bg-primary text-white"
              : "text-neutral hover:bg-base-300"
          }`
        }
      >
        <LuUsers size={20} />{" "}
        <span className="font-medium">My Connections</span>
      </NavLink>
      <NavLink
        to="/dashboard/create-partner"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            isActive
              ? "bg-primary text-white"
              : "text-neutral hover:bg-base-300"
          }`
        }
      >
        <LuUserPlus size={20} />{" "}
        <span className="font-medium">Create Partner</span>
      </NavLink>
      <NavLink
        to="/dashboard/create-blogs"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            isActive
              ? "bg-primary text-white"
              : "text-neutral hover:bg-base-300"
          }`
        }
      >
        <LuUserPlus size={20} />{" "}
        <span className="font-medium">CreateBlog</span>
      </NavLink>


    </div>
  );

  return (
<div className="bg-base-100 "> 
      <div className="max-w-[1800px] mx-auto min-h-screen bg-base-100 flex overflow-visible">
        <aside className="hidden lg:flex w-72 sticky top-0 h-screen bg-base-100 flex-col z-110">
          <div className="py-5 px-6 mb-6">
            <Link to={"/"} className="text-3xl font-black text-neutral tracking-tighter">
              Study<span className="text-primary">Mate</span>
            </Link>
          </div>
          <ul className="menu p-4 flex-1">{links}</ul>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0 bg-base-200">
          

          <div className="sticky top-0 z-100 w-full">
             <DasNav />
          </div>

          {/* PAGE CONTENT */}
          <main className="mt-19">
            <div className="w-full bg-secondary p-5">
              <Outlet />
            </div>
          </main>
        </div>

        {/* MOBILE SIDEBAR (DaisyUI Drawer Logic) */}
        <div className="drawer lg:hidden absolute">
          <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side z-120">
            <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
            <aside className="w-72 min-h-full bg-base-100 p-4">
              <ul className="menu">{links}</ul>
            </aside>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
