import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegClock, FaRegUser, FaArrowRight, FaInbox } from 'react-icons/fa'; // Added FaInbox
import { Link } from 'react-router'; 
import useAxios from '../../Hooks/useAxios';

const Blogs = () => {
  const axiosInstance = useAxios();
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Productivity", "Study Tips", "Community", "Tech", "Success Stories"];

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/allBlogs")
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [axiosInstance]);

  const filteredBlogs = activeCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 lg:px-10 text-neutral-content">
      <div className="max-w-[1536px] mx-auto">
        
        {/* --- HERO SECTION --- */}
        <header className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase"
          >
            The StudyMate Journal
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-8xl font-black mb-6 tracking-tighter"
          >
            Insights & <span className="text-primary">Resources</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="max-w-2xl mx-auto opacity-70 text-lg lg:text-xl font-medium"
          >
            Explore academic strategies, community stories, and productivity hacks.
          </motion.p>
        </header>

        {/* --- CATEGORY NAVIGATION --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 border ${
                activeCategory === cat 
                ? "bg-primary text-black border-primary shadow-lg scale-105" 
                : "bg-white/5 opacity-60 border-white/10 hover:opacity-100 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- BLOG GRID --- */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-[450px] w-full bg-current opacity-5 animate-pulse rounded-2xl border border-current/10"></div>
            ))}
          </div>
        ) : (
         <>
    {/* If data exists, show the grid */}
    {filteredBlogs.length > 0 ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode='popLayout'>
          {filteredBlogs.map((blog) => (
            <motion.div
              layout
              key={blog._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              // Removed whileHover={{ y: -10 }} to stop scale/up effect
              className="group relative bg-white/5 rounded-2xl border shadow-xl border-white/10 overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={blog.image || "https://via.placeholder.com/800x600"} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-black/40 backdrop-blur-md text-primary text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border border-white/10">
                    {blog.category || "Insight"}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col grow">
                <div className="flex items-center gap-4 text-[10px] font-mono opacity-50 mb-4 tracking-widest uppercase">
                  <span className="flex items-center gap-1.5"><FaRegClock className="text-primary"/> {blog?.createdAt}</span>
                </div>

                <button>
                  <h3 className="text-xl text-start font-bold mb-4 leading-tight group-hover:text-primary transition-colors ">
                    {blog.title}
                  </h3>
                </button>
                
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <FaRegUser className="text-primary text-xs" />
                    </div>
                    <span className="text-xs font-bold opacity-80">
                      {blog.authorName || blog.writerName || "Member"}
                    </span>
                  </div>
                  
                  <Link to={`/blog-details/${blog._id}`}>
                    <button className="flex items-center gap-2 text-sm font-black text-primary hover:gap-3 transition-all cursor-pointer">
                      READ <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    ) : (
      /* --- NO DATA AVAILABLE STATE --- */
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-32 px-6 rounded-[3rem] border-2 border-dashed border-white/10 bg-white/5 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <FaInbox className="text-primary text-3xl opacity-50" />
        </div>
        <h2 className="text-3xl font-bold mb-2">No Data Available</h2>
        <p className="opacity-50 max-w-sm mx-auto">
          We couldn't find any articles in the <span className="text-primary font-bold">"{activeCategory}"</span> category. Please check back later or try a different one.
        </p>
        <button 
          onClick={() => setActiveCategory("All")}
          className="mt-8 text-primary font-black hover:underline underline-offset-8"
        >
          View All Categories
        </button>
      </motion.div>
    )}
  </>
)}
      </div>
    </div>
  );
};

export default Blogs;