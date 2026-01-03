import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaShieldAlt, FaClock, FaArrowRight, FaRocket } from "react-icons/fa";
import { Link } from 'react-router';

const WhyChooseUs = () => {
  // Animation for the "Big Text" background
  const textVariant = {
    initial: { x: 0 },
    animate: {
      x: ["0%", "-50%"],
      transition: { duration: 25, repeat: Infinity, ease: "linear" }
    }
  };

  return (
    <section className="relative py-32 bg-black overflow-hidden border-t border-white/5">
      
      {/* 1. MOVING BACKGROUND TEXT */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.03] select-none pointer-events-none">
        <motion.h2 
          variants={textVariant}
          initial="initial"
          animate="animate"
          className="text-6xl font-black whitespace-nowrap text-white"
        >
          STUDY PARTNER COMMUNITY GLOBAL REACH PRODUCTIVITY STUDY PARTNER
        </motion.h2>
      </div>

      <div className="max-w-[1536px] mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="mb-20 text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-mono tracking-[0.3em] text-xs uppercase"
          >
            [ Beyond Simple Studying ]
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-black text-white mt-6 tracking-tighter leading-none">
            Built For <br /> <span className="text-primary">Serious Learners.</span>
          </h2>
        </div>

        {/* 2. THE BENTO GRID - Restructured without the AmazonPay section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
          
          {/* Big Feature: Global Network (Spanning 8 columns) */}
          <motion.div 
            whileHover={{ scale: 0.995 }}
            className="md:col-span-8 bg-[#161a1d] rounded-2xl border border-white/5 p-12 flex flex-col justify-between group overflow-hidden relative min-h-[450px]"
          >
            <FaGlobeAmericas className="text-primary/5 text-[20rem] absolute -right-10 -bottom-10 group-hover:text-primary/10 transition-all duration-700 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 border border-primary/20">
                <FaGlobeAmericas size={28}/>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Global Network</h3>
              <p className="text-gray-400 text-xl max-w-xl leading-relaxed">
                Connect with students from over 120 countries. Whether you need help with MIT Calculus or Oxford Literature, your partner is online right now.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-12 relative z-10">
                {["USA", "UK", "EUROPE", "BANGLADESH", "CANADA", "ASIA"].map(region => (
                    <span key={region} className="px-5 py-2 bg-white/5 rounded-full text-[10px] font-black tracking-[0.2em] text-gray-400 border border-white/5">
                        {region}
                    </span>
                ))}
            </div>
          </motion.div>

          {/* Side Feature: Security (Spanning 4 columns) */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="md:col-span-4 bg-[#161a1d] rounded-2xl border border-white/5 p-10 group flex flex-col justify-center"
          >
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all">
                <FaShieldAlt size={30} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Private & Secure</h3>
            <p className="text-gray-500 text-lg leading-relaxed">
              Your data and conversations are end-to-end encrypted. Study with total peace of mind.
            </p>
          </motion.div>

          {/* Bottom Feature: 24/7 (Spanning full 12 columns for a wide impactful break) */}
          <motion.div 
            whileHover={{ scale: 0.995 }}
            className="md:col-span-12 bg-[#161a1d] rounded-2xl border border-white/5 p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative min-h-[300px]"
          >
            <div className="z-10 text-center md:text-left">
              <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter italic">24/7 Productivity</h3>
              <p className="text-gray-500 text-xl max-w-md">
                The sun never sets on learning. Find partners in every timezone, any hour of the day.
              </p>
            </div>
            
            {/* Animated Audio/Visualizer Wave */}
            <div className="flex gap-3 h-32 items-center z-10 mt-8 md:mt-0">
                {[0.4, 1.0, 0.6, 0.8, 0.5, 0.9, 0.4, 0.7].map((h, i) => (
                    <motion.div 
                        key={i}
                        animate={{ height: [`${h*100}%`, `${(h*0.3)*100}%`, `${h*100}%`] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-4 bg-primary/30 rounded-full"
                    />
                ))}
            </div>
            <FaClock className="absolute -left-10 text-white/5 text-[15rem] pointer-events-none opacity-50" />
          </motion.div>

        </div>

        {/* 3. FINAL CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-30 bg-linear-to-r  from-primary/30 via-transparent to-primary/30 rounded-2xl"
        >
          <div className="bg-[#161a1d] rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                  <h4 className="text-4xl font-black text-white tracking-tight">Ready to launch your journey?</h4>
                  <p className="text-gray-400 text-xl mt-3">Join 10,000+ students already reaching their potential.</p>
              </div>
              <Link to="/findPartner" className="px-12 py-6 bg-primary text-black font-black rounded-full hover:scale-105 transition-all flex items-center gap-3 text-lg shadow-[0_0_40px_rgba(var(--p),0.2)]">
                  GET STARTED NOW <FaArrowRight />
              </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;