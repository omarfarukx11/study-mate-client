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
  const [direction, setDirection] = useState(0);
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
      x: direction === 0 ? 0 : direction > 0 ? "100%" : "-100%",
    }),
    animate: {
      x: 0,
      transition: { 
        duration: 1.2,
        ease: [0.45, 0, 0.55, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      transition: { 
        duration: 1.2,
        ease: [0.45, 0, 0.55, 1]
      }
    })
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black text-white">
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
              className="w-full h-full object-cover object-[70%] lg:object-center"
              alt="Banner"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 lg:from-black/60 lg:via-black/30 lg:to-black/60" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-primary tracking-[0.4em] lg:tracking-[0.8em] font-bold text-[10px] lg:text-xs mb-4 uppercase"
            >
              {slides[index].category}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-5xl lg:text-[90px] font-black leading-tight mb-4 lg:mb-6 drop-shadow-2xl"
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/80 text-sm lg:text-xl font-light mb-8 lg:mb-10 max-w-xl italic leading-relaxed"
            >
              {slides[index].sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button
                onClick={() => navigate("/findPartner")}
                className="px-8 lg:px-12 py-3 lg:py-4 bg-primary text-white text-[10px] lg:text-xs tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all duration-500 rounded-none shadow-xl"
              >
                Find Partner
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* --- RESPONSIVE ARROW BUTTONS --- */}
      {/* Mobile: top is center minus 50px. Desktop: top is middle (50%) */}
      <div className="absolute top-[calc(50%-100px)] lg:top-1/2 -translate-y-1/2 w-full flex justify-between px-4 lg:px-10 z-50 pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-3 lg:p-4 rounded-full border border-white/20 text-white hover:bg-primary transition-all duration-500 bg-black/40 backdrop-blur-md pointer-events-auto shadow-2xl active:scale-90 lg:active:scale-100"
        >
          <IoArrowBackOutline className="text-xl lg:text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 lg:p-4 rounded-full border border-white/20 text-white hover:bg-primary transition-all duration-500 bg-black/40 backdrop-blur-md pointer-events-auto shadow-2xl active:scale-90 lg:active:scale-100"
        >
          <IoArrowForwardOutline className="text-xl lg:text-2xl" />
        </button>
      </div>

      {/* Progress Bar */}
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