import React, { useEffect, useState } from "react";
import PartnerCard from "./PartnerCard";
import { FcSearch } from "react-icons/fc";

const FindPartner = () => {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/findPartner")
      .then((res) => res.json())
      .then((data) => setPartners(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredPartners = partners
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

  return (
    <div className="min-h-screen w-[1536px] mx-auto bg-gray-100 p-6 md:p-10">
      {/* Header */}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-8">
        Find Your Study Partner
      </h1>

      {/* Search + Sort Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder=" Search by name, skill, or subject..."
          className="w-full md:w-2/3 px-4 py-2 border-2 border-green-400 rounded-sm focus:outline-none focus:border-green-500 text-sm md:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className={`w-full md:w-1/4 px-3 py-2 border-2 rounded-sm text-sm md:text-base outline-none focus:ring-0 ${
            sortOption ? "border-green-500" : "border-green-500"
          }`}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="name">Name</option>
          <option value="experience">Experience</option>
        </select>
      </div>

      {/* Partner Cards */}
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-8">
        {filteredPartners.length > 0 ? (
          filteredPartners.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} />
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No matching partners found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindPartner;
