import React, { useEffect, useState } from "react";
import PartnerCard from "./PartnerCard";
import Loader from "../../Components/Loader";
import useAxios from "../../Hooks/useAxios";
import PartnerNotFound from "../../Components/PartnerNotFound";

const FindPartner = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [pageLoading, setPageLoading] = useState(true); 
  const [loading, setLoading] = useState(false); 
  const axiosInstance = useAxios();


  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);


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
            return levels[b.experienceLevel] - levels[a.experienceLevel];
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
    <div className="min-h-screen 2xl:w-[1536px] mx-auto p-6 md:p-10 relative">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-8">
        Find Your Study Partner
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name, skill, or subject..."
          className="w-full md:w-2/3 px-4 py-2 border-2 border-[#5BBC2E] rounded-sm focus:outline-none focus:border-[#5BBC2E] text-sm md:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="w-full md:w-1/4 px-3 py-2 border-2 rounded-sm text-sm md:text-base outline-none focus:ring-0 border-[#5BBC2E] hover:border-[#45A527] hover:bg-[#F0FFF0] transition-colors duration-200 ease-in-out"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="name">Name</option>
          <option value="experience">Experience</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : filteredPartners.length > 0 ? (
        <div className="grid xl:grid-cols-3 grid-cols-1 gap-8">
          {filteredPartners.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} />
          ))}
        </div>
      ) : (
        <PartnerNotFound />
      )}
    </div>
  );
};

export default FindPartner;
