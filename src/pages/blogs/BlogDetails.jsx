import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaRegClock, FaRegUser, FaArrowLeft, FaShareAlt } from "react-icons/fa";

const BlogDetails = () => {
  const blog = useLoaderData();
  const navigate = useNavigate();

  const { title, description, image, category, authorName, createdAt } = blog || {};

  return (
    <div className="min-h-[calc(100vh-120px)] pt-10 pb-20 px-4 text-neutral-content">
      <div className="max-w-4xl mx-auto">
        
        {/* --- BACK BUTTON --- */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 opacity-60 hover:opacity-100 hover:text-primary transition-all mb-8 font-bold text-sm"
        >
          <FaArrowLeft /> Back to Blogs
        </button>

        {/* --- ARTICLE HEADER --- */}
        <header className="mb-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-widest text-xs border border-primary/30 px-3 py-1 rounded-full bg-primary/5"
          >
            {category || "Uncategorized"}
          </motion.span>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl lg:text-6xl font-black mt-6 mb-8 leading-tight tracking-tight"
          >
            {title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-6 py-6 border-y border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <FaRegUser className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Author</p>
                <p className="font-bold text-sm">{authorName || "StudyMate Member"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <FaRegClock className="text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Published</p>
                <p className="font-bold text-sm">{createdAt || "Jan 03, 2026"}</p>
              </div>
            </div>
          </div>
        </header>

        {/* --- FEATURED IMAGE --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl"
        >
          <img 
            src={image || "https://via.placeholder.com/1200x600"} 
            alt={title} 
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </motion.div>

        {/* --- CONTENT BODY --- */}
        <article className="prose prose-invert max-w-none">
          <div className="text-lg lg:text-xl leading-relaxed opacity-80 whitespace-pre-wrap font-medium">
            {description}
          </div>
        </article>

        {/* --- FOOTER --- */}
        <footer className="mt-16 pt-10 border-t border-white/10 flex justify-between items-center">
          <p className="text-sm opacity-50 font-medium">© 2026 StudyMate Journal</p>
        </footer>

      </div>
    </div>
  );
};

export default BlogDetails;