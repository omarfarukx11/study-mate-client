import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PartnerCard from "./PartnerCard";
import Loader from "../../Components/Loader";
import useAxios from "../../Hooks/useAxios";
import PartnerNotFound from "../../Components/PartnerNotFound";

// 1. Animation Variants for the Grid and Cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Time between each card appearing
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.8, // Slower, smoother duration
      ease: [0.22, 1, 0.36, 1], // Smooth "Out-Expo" easing
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.4 }
  }
};

const FindPartner = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();

  // Page entry loader logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Fetch data
  useEffect(() => {
    setLoading(true);
    axiosInstance("/findPartner")
      .then((res) => {
        setPartners(res.data);
        setFilteredPartners(res.data);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  // Filter and Sort logic with Debounce effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = partners
        .filter((p) =>
          [p.name, p.skill, p.subject].some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
        .sort((a, b) => {
          if (sortOption === "rating") return b.rating - a.rating;
          if (sortOption === "name") return a.name.localeCompare(b.name);
          if (sortOption === "experience") {
            const levels = { Beginner: 1, Intermediate: 2, Advanced: 3 };
            return (levels[b.experienceLevel] || 0) - (levels[a.experienceLevel] || 0);
          }
          return 0;
        });

      setFilteredPartners(filtered);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, sortOption, partners]);

  if (pageLoading) {
    return <Loader fullScreen={true} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full bg-secondary"
    >
      <div className="min-h-screen 2xl:w-[1536px] mx-auto p-6 md:p-10 relative text-neutral-content">
        <title>StudyMate - Find Partners</title>
        
        <motion.h1 
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold text-center text-primary my-20"
        >
          Find Your Study Partner
        </motion.h1>

        {/* Filter Section with subtle slide up */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-20"
        >
          <input
            type="text"
            placeholder="Search by name, skill, or subject..."
            className="w-full md:w-2/3 px-4 py-2 border-2 border-primary rounded-sm focus:outline-none focus:border-primary text-sm md:text-base bg-transparent transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="w-full select select-bordered md:w-1/4 px-3 py-2 border-2 rounded-sm text-sm md:text-base outline-none focus:ring-0 border-primary transition-colors duration-200 ease-in-out text-neutral-content bg-secondary"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
            <option value="experience">Experience</option>
          </select>
        </motion.div>

        {/* Dynamic Content Area */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredPartners.length > 0 ? (
              <motion.div
                key="partner-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8"
              >
                {filteredPartners.map((partner) => (
                  <motion.div 
                    key={partner._id} 
                    variants={cardVariants}
                    className="h-full"
                  >
                    <PartnerCard partner={partner} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                <PartnerNotFound />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default FindPartner;