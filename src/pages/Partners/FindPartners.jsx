import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PartnerCard from "./PartnerCard";
import Loader from "../../Components/Loader";
import useAxios from "../../Hooks/useAxios";
import PartnerNotFound from "../../Components/PartnerNotFound";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FindPartner = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  
  // Pagination States
  const itemsPerPage = 15; 
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // 1. Initial Page Loader
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // 2. Fetch Data
  useEffect(() => {
    setLoading(true);
    setPartners([]); 

    axiosInstance(`/findPartner?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => {
        setPartners(res.data.partners || []);
        setTotalCount(res.data.count || 0);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [axiosInstance, currentPage, itemsPerPage]);

  // 3. Filter and Sort
  useEffect(() => {
    let result = [...partners];

    if (searchTerm) {
      result = result.filter((p) =>
        [p.name, p.skill, p.subject].some((field) =>
          field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    result.sort((a, b) => {
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    setFilteredPartners(result);
  }, [searchTerm, sortOption, partners]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pageLoading) return <Loader fullScreen={true} />;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="w-full bg-secondary"
    >
      <div className="min-h-screen 2xl:w-[1536px] mx-auto p-6 md:p-10 text-neutral-content">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-5xl font-bold text-primary mb-4"
          >
            Find Your Study Partner
          </motion.h1>
          
          <div className="flex flex-col items-center gap-2">
            <div className="badge badge-primary badge-outline gap-2 p-4">
              <span className="font-bold">{totalCount}</span> Total Partners
            </div>
            {totalCount > 0 && (
              <p className="text-sm opacity-70">
                {/* Logic: Showing 12 of 23 on page 1, Showing 11 of 23 on page 2 */}
                Showing <span className="font-bold text-primary">{filteredPartners.length}</span> of {totalCount}
              </p>
            )}
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search on this page..."
            className="input input-bordered border-primary w-full md:w-2/3 bg-transparent focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="select select-bordered border-primary w-full md:w-1/4 bg-secondary text-neutral-content"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Grid Area */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              {filteredPartners.length > 0 ? (
                <motion.div
                  key={currentPage}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:grid-cols-5"
                >
                  {filteredPartners.map((partner) => (
                    <motion.div key={partner._id} variants={cardVariants}>
                      <PartnerCard partner={partner} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <PartnerNotFound />
              )}
            </AnimatePresence>

            {/* Pagination UI */}
            {numberOfPages > 1 && (
              <div className="flex justify-center mt-16 mb-10">
                <div className="join shadow-lg border border-primary/20 bg-base-100">
                  <button
                    disabled={currentPage === 0}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="join-item btn btn-outline border-primary hover:bg-primary"
                  >
                    « Prev
                  </button>

                  {pages.map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`join-item btn btn-outline border-primary ${
                        currentPage === page ? "bg-primary text-white hover:bg-primary" : ""
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === numberOfPages - 1}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="join-item btn btn-outline border-primary hover:bg-primary"
                  >
                    Next »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default FindPartner;