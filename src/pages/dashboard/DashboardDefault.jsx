import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Legend 
} from 'recharts';
import { motion } from 'framer-motion';
import { FaBookReader, FaUsers, FaClock, FaTrophy } from 'react-icons/fa';

const DashboardDefault = () => {
  // Mock Data for the charts
  const studyData = [
    { day: 'Mon', hours: 4, sessions: 2 },
    { day: 'Tue', hours: 6, sessions: 3 },
    { day: 'Wed', hours: 3, sessions: 1 },
    { day: 'Thu', hours: 8, sessions: 4 },
    { day: 'Fri', hours: 5, sessions: 2 },
    { day: 'Sat', hours: 9, sessions: 5 },
    { day: 'Sun', hours: 7, sessions: 3 },
  ];

  const categoryData = [
    { name: 'Mathematics', score: 85 },
    { name: 'Science', score: 72 },
    { name: 'History', score: 90 },
    { name: 'Programming', score: 95 },
    { name: 'Languages', score: 68 },
  ];

  const stats = [
    { id: 1, label: "Total Study Hours", value: "42h", icon: <FaClock />, color: "text-blue-500" },
    { id: 2, label: "Partners Met", value: "12", icon: <FaUsers />, color: "text-purple-500" },
    { id: 3, label: "Courses Completed", value: "5", icon: <FaBookReader />, color: "text-green-500" },
    { id: 4, label: "Achievement Points", value: "1,250", icon: <FaTrophy />, color: "text-yellow-500" },
  ];

  return (
    <div className="space-y-8 min-h-[calc(100vh-80px)] bg-base-200 p-4 rounded-lg ">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-neutral">Welcome back, Scholar! 👋</h1>
          <p className="text-neutral/60">Here is what’s happening with your study goals today.</p>
        </div>
        <button className="btn btn-primary">Start Study Session</button>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div 
            key={stat.id}
            whileHover={{ y: -5 }}
            className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex items-center gap-4"
          >
            <div className={`text-3xl ${stat.color} bg-base-200 p-3 rounded-xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-neutral/50 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Productivity Line Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200 h-[400px]"
        >
          <h3 className="text-xl font-bold mb-6">Weekly Productivity</h3>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={studyData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#570df8" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#570df8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="hours" stroke="#570df8" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Performance Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200 h-[400px]"
        >
          <h3 className="text-xl font-bold mb-6">Subject Proficiency (%)</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="score" fill="#37cdbe" radius={[10, 10, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>

      {/* Bottom Row: Recent Activity (Increases Dashboard Height) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-200"
      >
        <h3 className="text-xl font-bold mb-6">Recent Partner Activity</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-neutral/50">
                <th>Partner</th>
                <th>Subject</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder"><div className="bg-neutral text-neutral-content rounded-full w-8"><span>A</span></div></div>
                    <span className="font-bold">Ariful I.</span>
                  </div>
                </td>
                <td>React Reconciliation</td>
                <td>1h 20m</td>
                <td><span className="badge badge-success badge-sm text-white">Completed</span></td>
              </tr>
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder"><div className="bg-primary text-primary-content rounded-full w-8"><span>S</span></div></div>
                    <span className="font-bold">Sarah C.</span>
                  </div>
                </td>
                <td>Quantum Physics</td>
                <td>45m</td>
                <td><span className="badge badge-ghost badge-sm">Scheduled</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardDefault;