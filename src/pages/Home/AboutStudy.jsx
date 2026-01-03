import React from 'react';
import { motion } from 'framer-motion';
import { IoPersonAddSharp, IoChatbubblesOutline } from "react-icons/io5";
import { FaBook, FaSearch, FaUsers, FaGraduationCap, FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router';

const AboutStudy = () => {
  // Existing Animations
  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, type: "spring", stiffness: 100 }
    })
  };

  // New Stagger Animation for the Grid Containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const steps = [
    { icon: <IoPersonAddSharp />, title: "1. Create Your Profile", desc: "Sign up and share your study interests, goals, and skills to match with the right partner." },
    { icon: <FaSearch />, title: "2. Find a Partner", desc: "Browse through our study community and connect with learners who match your goals." },
    { icon: <FaBook />, title: "3. Study Together", desc: "Chat, collaborate, and achieve your study goals together — anytime, anywhere." },
    { icon: <IoPersonAddSharp />, title: "1. Create Your Profile", desc: "Sign up and share your study interests, goals, and skills to match with the right partner." },
    { icon: <FaSearch />, title: "2. Find a Partner", desc: "Browse through our study community and connect with learners who match your goals." },
    { icon: <FaBook />, title: "3. Study Together", desc: "Chat, collaborate, and achieve your study goals together — anytime, anywhere." },
  ];

  const stats = [
    { icon: <FaUsers />, count: "10K+", label: "Active Learners" },
    { icon: <FaBook />, count: "500+", label: "Study Groups" },
    { icon: <FaGraduationCap />, count: "120+", label: "Subjects Covered" },
    { icon: <IoChatbubblesOutline />, count: "50K+", label: "Messages Sent" },
  ];

  const blogs = [
    { tag: "Productivity", title: "5 Tips for Effective Virtual Study Sessions", author: "Dr. Sarah Chen" },
    { tag: "Community", title: "How to Find the Perfect Study Partner", author: "Mark Thompson" },
    { tag: "Science", title: "The Pomodoro Technique: Why it Works", author: "Exam Prep Team" },
    { tag: "Productivity", title: "5 Tips for Effective Virtual Study Sessions", author: "Dr. Sarah Chen" },
    { tag: "Community", title: "How to Find the Perfect Study Partner", author: "Mark Thompson" },
    { tag: "Science", title: "The Pomodoro Technique: Why it Works", author: "Exam Prep Team" },
    { tag: "Productivity", title: "5 Tips for Effective Virtual Study Sessions", author: "Dr. Sarah Chen" },
    { tag: "Community", title: "How to Find the Perfect Study Partner", author: "Mark Thompson" },
   
  ];

  return (
    <section className="bg-secondary relative overflow-hidden max-w-[1536px] mx-auto">

      <div className="max-w-[1536px] mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-20"
        >
          <h2 className="lg:text-6xl text-4xl font-bold mb-4 text-secondary-content">How It Works</h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1.5 bg-primary mx-auto rounded-full mb-6" 
          />
          <p className="text-secondary-content/80 text-lg md:text-xl max-w-2xl mx-auto">
            Study Mate makes it easy to find your ideal partner and stay productive together.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-10 mb-32"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              className="card bg-base-100 hover:shadow-sm border border-primary/5 group relative overflow-hidden"
            >
              <div className="card-body items-center text-center p-10">
                <motion.div variants={floatAnimation} animate="animate" className="md:text-7xl text-5xl text-primary mb-6">
                  {step.icon}
                </motion.div>
                <h3 className="card-title md:text-2xl font-bold mb-4 text-neutral">{step.title}</h3>
                <p className="text-neutral/60 md:text-lg leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>


        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary/10 rounded-3xl p-12 mb-32 border border-primary/20"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                viewport={{ once: true }}
              >
                <div className="text-primary text-4xl mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-black text-secondary-content">{stat.count}</div>
                <div className="text-secondary-content/60 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="pb-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-secondary-content mb-4">Latest Insights</h2>
              <p className="text-secondary-content/70 text-lg">Stay updated with the latest study techniques and community news.</p>
            </div>
            <Link to={'/blogs'} className="btn btn-primary btn-outline rounded-full px-8 group">
               View All Blogs <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {blogs.map((blog, i) => (
              <motion.div 
                key={i}
                variants={cardVariants}
                custom={i}
                whileHover={{ scale: 1.03 }}
                className="bg-base-100 rounded-2xl overflow-hidden hover:shadow-sm flex flex-col h-full border border-base-200"
              >
                <div className="h-48 bg-primary/20 flex items-center justify-center text-primary/30 text-6xl">
                  <FaBook />
                </div>
                <div className="p-8 flex flex-col grow">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 italic">
                    {blog.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-neutral mb-4 leading-tight">
                    {blog.title}
                  </h3>
                  <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm text-neutral/50 font-medium">By {blog.author}</span>
                    <button className="text-primary font-bold flex items-center gap-1 hover:underline">
                      Read <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AboutStudy;