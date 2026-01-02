import React from 'react';
import DasNav from '../Components/DasNav';
import { Link, NavLink, Outlet } from 'react-router';
import { LuLayoutDashboard, LuUsers, LuUserPlus } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";

const Dashboard = () => {
  const links = (
    <div className="flex flex-col gap-2">
      <NavLink to="/" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-primary text-white" : "text-neutral hover:bg-base-300"}`}>
        <AiOutlineHome size={20} /> <span className="font-medium">Back Home</span>
      </NavLink>
      <NavLink to="/dashboard" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-primary text-white" : "text-neutral hover:bg-base-300"}`}>
        <LuLayoutDashboard size={20} /> <span className="font-medium">Overview</span>
      </NavLink>
      <NavLink to="/dashboard/myConnection" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-primary text-white" : "text-neutral hover:bg-base-300"}`}>
        <LuUsers size={20} /> <span className="font-medium">My Connections</span>
      </NavLink>
      <NavLink to="/dashboard/create-partner" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-primary text-white" : "text-neutral hover:bg-base-300"}`}>
        <LuUserPlus size={20} /> <span className="font-medium">Create Partner</span>
      </NavLink>
    </div>
  );

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">

        <DasNav />

        <main className="flex-1 p-4 lg:p-8 mt-[74px]">

          <div className="max-w-[1800px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar Section */}
      <div className="drawer-side z-110">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <aside className="w-72 min-h-full bg-base-100  flex flex-col">
          <div className="py-4 px-4 mb-6  border-b border-gray-400 ">
             <Link to={'/'} className="text-3xl font-black text-neutral tracking-tighter">
              Study<span className="text-primary">Mate</span>
            </Link>
          </div>
          <ul className="menu p-0">{links}</ul>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;