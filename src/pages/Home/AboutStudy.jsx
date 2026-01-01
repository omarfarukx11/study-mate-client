import React from 'react';
import { motion } from 'framer-motion';
import { IoPersonAddSharp } from "react-icons/io5";
import { FaBook, FaSearch } from "react-icons/fa";

const AboutStudy = () => {
  // 1. Floating Animation for Icons (Up and Down)
  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // 2. Card Entrance Variants (Slide in from bottom with a spring)
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const steps = [
    { 
      icon: <IoPersonAddSharp />, 
      title: "1. Create Your Profile", 
      desc: "Sign up and share your study interests, goals, and skills to match with the right partner." 
    },
    { 
      icon: <FaSearch />, 
      title: "2. Find a Partner", 
      desc: "Browse through our study community and connect with learners who match your goals." 
    },
    { 
      icon: <FaBook />, 
      title: "3. Study Together", 
      desc: "Chat, collaborate, and achieve your study goals together — anytime, anywhere." 
    }
  ];

  return (
    <section className="bg-secondary py-20 my-10 relative overflow-hidden">
      {/* Background Decoration: Animated blurred circle */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1536px] mx-auto p-5 relative z-10">
        
        {/* Animated Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="lg:text-6xl text-4xl font-bold mb-4 text-secondary-content">How It Works</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-secondary-content/80 text-lg md:text-xl max-w-2xl mx-auto">
            Study Mate makes it easy to find your ideal partner and stay productive together.
          </p>
        </motion.div>

        {/* Grid of Cards */}
        <div className="grid lg:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -12 }} // Lift card on hover
              viewport={{ once: true }}
              className="card bg-base-100 shadow-2xl border border-primary/5 group relative overflow-hidden"
            >
              {/* Animated Top Border on Hover */}
              <div className="absolute top-0 left-0 h-1.5 w-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="card-body items-center text-center p-10">
                {/* Floating Icon Container */}
                <motion.div 
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                  className="md:text-7xl text-5xl text-primary mb-6"
                >
                  {step.icon}
                </motion.div>

                <h3 className="card-title md:text-2xl font-bold mb-4 text-neutral">
                  {step.title}
                </h3>
                
                <p className="text-neutral/60 md:text-lg leading-relaxed">
                  {step.desc}
                </p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStudy;