import React from "react";
import { motion } from "framer-motion";
import { IoPersonAddSharp, IoChatbubblesOutline } from "react-icons/io5";
import {
  FaBook,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router";

const AboutStudy = () => {
  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const steps = [
    {
      icon: <IoPersonAddSharp />,
      title: "Create Your Profile",
      desc: "Your journey starts by defining who you are as a learner. List your subjects, study habits, and academic goals.",
      longDesc:
        "Detailed profiles help our algorithm understand your learning style—whether you're a night owl or a visual learner.",
    },
    {
      icon: <FaSearch />,
      title: "Find Your Match",
      desc: "Filter through thousands of active students based on location, subject, or availability. Our community is diverse and global.",
      longDesc:
        "Use advanced filters to find people studying the same specific topics as you, from Physics to Creative Writing.",
    },
    {
      icon: <IoChatbubblesOutline />,
      title: "Instant Collaboration",
      desc: "Once you match, jump into a secure chat to set your schedule. Use integrated tools to share resources.",
      longDesc:
        "Communication is key. Our platform provides a safe space to discuss session agendas before you meet.",
    },
    {
      icon: <FaBook />,
      title: "Achieve Goals Together",
      desc: "Study sessions are more effective when you're not alone. Stay accountable and track your progress as a pair.",
      longDesc:
        "Experience the 'Protege Effect'—teaching others is the best way to learn and push each other towards excellence.",
    },
  ];



  return (
    <section className="relative overflow-hidden max-w-[1536px] mx-auto text-neutral-content">
      <div className="max-w-[1536px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-24"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            Our Process
          </span>
          <h2 className="lg:text-7xl text-5xl font-black mb-6 text-neutral-content tracking-tighter">
            How StudyMate Works
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-2 bg-primary mx-auto rounded-full mb-8"
          />
          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Follow these steps to transform your academic results.
          </p>
        </motion.div>

        <div className="relative py-10">
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full hidden md:block bg-linear-to-b from-primary via-primary/20 to-transparent opacity-100"
            style={{ height: "calc(100% - 100px)" }}
          ></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`flex flex-col md:flex-row items-center mb-40 last:mb-0 relative ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-black border-2 border-primary rounded-full hidden md:flex items-center justify-center text-primary text-2xl z-20 shadow-[0_0_20px_rgba(var(--p),0.3)]">
                {step.icon}
              </div>

              <div className="md:w-5/12 w-full">
                <div className="bg-[#121212] p-10 rounded-xl border border-white/5 hover:border-primary/40 transition-all duration-500 group relative">
                  {/* Mobile Icon */}
                  <div className="text-primary text-5xl mb-6 md:hidden">
                    {step.icon}
                  </div>

                  <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    {step.desc}
                  </p>
                  <p className="text-gray-500 text-sm italic border-l-2 border-primary/30 pl-4">
                    {step.longDesc}
                  </p>
                </div>
              </div>
              <div className="md:w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>






    
    </section>
  );
};

export default AboutStudy;
