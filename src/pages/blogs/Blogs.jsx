import React, { useState } from 'react';
import { motion ,AnimatePresence} from 'framer-motion';
import { FaRegClock, FaRegUser, FaArrowRight, FaSearch } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Productivity", "Study Tips", "Community", "Tech", "Success Stories"];

  const blogData = [
    {
      id: 1,
      category: "Productivity",
      title: "The Science of Deep Work: How to Focus in a Distracted World",
      excerpt: "Understanding the neurological basis of concentration can help you achieve more in less time. Learn the 4 pillars of deep work...",
      author: "Dr. Ariful Islam",
      date: "Oct 12, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      featured: true
    },
    {
      id: 2,
      category: "Study Tips",
      title: "Active Recall vs. Passive Rereading",
      excerpt: "Why your current study habits might be failing you and how to switch to high-utility techniques supported by cognitive science.",
      author: "Sarah Chen",
      date: "Nov 05, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      category: "Community",
      title: "Building a Global Study Circle from Your Bedroom",
      excerpt: "How StudyMate users are connecting across 15 different time zones to prepare for international examinations together.",
      author: "James Wilson",
      date: "Dec 01, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      category: "Tech",
      title: "AI Tools that Actually Help You Learn (Not Cheat)",
      excerpt: "A curated list of AI-powered research assistants and summarizers that enhance your critical thinking skills.",
      author: "Rayhan Kabir",
      date: "Dec 15, 2025",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      category: "Success Stories",
      title: "From Struggling Student to Dean's List",
      excerpt: "How accountability partnering helped one student overcome chronic procrastination and find a passion for mathematics.",
      author: "Emma Watson",
      date: "Jan 02, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      category: "Study Tips",
      title: "Note-Taking Systems: Beyond the Cornell Method",
      excerpt: "Exploring digital obsidian workflows and mind-mapping techniques for complex engineering subjects.",
      author: "David Miller",
      date: "Jan 10, 2026",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const filteredBlogs = activeCategory === "All" 
    ? blogData 
    : blogData.filter(blog => blog.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 lg:px-10">
      <div className="max-w-[1536px] mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-neutral mb-6"
          >
            Insights & <span className="text-primary">Resources</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-neutral/60 text-lg">
            Explore our library of academic strategies, community stories, and productivity hacks to supercharge your learning journey.
          </p>
        </header>

        {/* --- CATEGORY FILTER --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                activeCategory === cat 
                ? "bg-primary text-white shadow-lg scale-105" 
                : "bg-base-100 text-neutral/70 hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- FEATURED BLOG (Hero Card) --- */}
        {activeCategory === "All" && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16 group cursor-pointer"
          >
            <div className="bg-base-100 rounded-xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-primary/5">
              <div className="lg:w-1/2 overflow-hidden">
                <img 
                  src={blogData[0].image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Featured" 
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                <span className="text-primary font-black tracking-widest uppercase text-sm mb-4 block">Featured Article</span>
                <h2 className="text-3xl lg:text-5xl font-bold text-neutral mb-6 leading-tight">
                  {blogData[0].title}
                </h2>
                <p className="text-neutral/60 text-lg mb-8 leading-relaxed">
                  {blogData[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-neutral/40 mb-8">
                   <span className="flex items-center gap-2"><FaRegUser /> {blogData[0].author}</span>
                   <span className="flex items-center gap-2"><FaRegClock /> {blogData[0].readTime}</span>
                </div>
                <button className="btn btn-primary w-fit px-8 rounded-full group">
                  Read Full Article <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-all" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- BLOG GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredBlogs.map((blog) => (
              <motion.div
                layout
                key={blog.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="card bg-base-100 shadow-xl border border-primary/5 overflow-hidden group"
              >
                <figure className="relative h-60 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt="Blog" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                      {blog.category}
                    </span>
                  </div>
                </figure>
                
                <div className="card-body p-8">
                  <div className="flex items-center gap-4 text-xs text-neutral/40 mb-4">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="card-title text-xl font-bold text-neutral mb-4 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-neutral/60 text-sm line-clamp-3 mb-6">
                    {blog.excerpt}
                  </p>
                  <div className="card-actions justify-between items-center mt-auto pt-6 border-t border-base-200">
                    <span className="text-xs font-bold text-neutral/70 italic flex items-center gap-2">
                      <FaRegUser className="text-primary" /> {blog.author}
                    </span>
                    <button className="text-primary font-black text-sm flex items-center gap-1 hover:underline">
                      Read <FaArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- NEWSLETTER SECTION (To increase height further) --- */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="mt-32 bg-primary rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30"
        >
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-black mb-6">Never Miss a Study Hack</h2>
            <p className="text-white/80 text-xl max-w-xl mx-auto mb-10">
              Join 5,000+ learners receiving weekly insights directly in their inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="input input-bordered grow rounded-full text-neutral font-medium px-8 h-14 focus:outline-primary"
              />
              <button className="btn bg-neutral text-white border-none hover:bg-neutral/80 h-14 px-10 rounded-full font-black uppercase tracking-wider">
                Subscribe
              </button>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
        </motion.div>

      </div>
    </div>
  );
};

export default Blogs;