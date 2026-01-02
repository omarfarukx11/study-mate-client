import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const slides = [
  {
    url: "https://i.ibb.co/Z6kJVWq4/pexels-gabby-k-6237989.jpg",
    category: "CONNECT",
    title: "GLOBAL PARTNERS",
    sub: "Collaborate with the world's most dedicated learners."
  },
  {
    url: "https://i.ibb.co/60Tp09Cj/pexels-armin-rimoldi-5553921.jpg",
    category: "LEARN",
    title: "EXPERT MENTORS",
    sub: "Master new skills with peer-to-peer guidance."
  },
  {
    url: "https://i.ibb.co/PZ83Nd0B/pexels-zen-chung-5538346.jpg",
    category: "GROW",
    title: "STUDY GROUPS",
    sub: "Find your community and bridge the knowledge gap."
  }
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0 ensures no image slide on first load
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [index]);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    initial: (direction) => ({
      // Direction 0 mane prothombar, tokhon x: 0 thakbe (kono slide hobe na)
      x: direction === 0 ? 0 : direction > 0 ? "100%" : "-100%",
    }),
    animate: {
      x: 0,
      transition: { 
        duration: 1.8,
        ease: [0.45, 0, 0.55, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      transition: { 
        duration: 1.8,
        ease: [0.45, 0, 0.55, 1]
      }
    })
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* initial={true} thakbe jate text animate hoy, kintu direction logic image slide bondho rakhbe */}
      <AnimatePresence initial={true} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <div className="w-full h-full">
            <img
              src={slides[index].url}
              className="w-full h-full object-cover"
              alt="Banner"
            />
          </div>
          
          {/* Black Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />

          {/* TEXT ANIMATIONS - First visit e eituku e animate hobe */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
            
            <motion.p
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-primary tracking-[0.8em] font-bold text-xs mb-4 uppercase"
            >
              {slides[index].category}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-4xl lg:text-[90px] font-black text-white leading-tight mb-6 drop-shadow-2xl"
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-white/80 text-base lg:text-xl font-light mb-10 max-w-2xl italic"
            >
              {slides[index].sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <button
                onClick={() => navigate("/findPartner")}
                className="px-12 py-4 bg-primary text-white text-xs tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all duration-500 rounded-none shadow-xl"
              >
                Find Partner
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ARROW BUTTONS */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 z-50 pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-4 rounded-full border border-white/20 text-white hover:bg-primary transition-all duration-500 bg-black/30 backdrop-blur-md pointer-events-auto"
        >
          <IoArrowBackOutline size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-4 rounded-full border border-white/20 text-white hover:bg-primary transition-all duration-500 bg-black/30 backdrop-blur-md pointer-events-auto"
        >
          <IoArrowForwardOutline size={24} />
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10 z-50">
        <motion.div
          key={index}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
          className="h-full bg-primary"
        />
      </div>
    </div>
  );
};

export default Banner;