import React from "react";
import { FaRegStar, FaEnvelope, FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";
import { useLoaderData } from "react-router";

const PartnerDetails = () => {
  const partnerDetails = useLoaderData();
  const {
    name,
    skill,
    subject,
    rating,
    experienceLevel,
    availabilityTime,
    email,
    location,
    partnerCount,
    profileImage,
    studyMode,
  } = partnerDetails;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-6">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row border-2 border-green-500">
        
        {/* Left Image */}
        <div className="w-full md:w-1/2 p-4">
          <img
            src={"https://i.ibb.co.com/60Tp09Cj/pexels-armin-rimoldi-5553921.jpg"}
            alt={name}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
       

        {/* Right Content */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between gap-6">
          <div>
            {/* Name */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">{name}</h1>

            {/* //Separator */}
            <div className="my-6 border-t-3 border-[#5BBC2E] rounded-full"></div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
              <span className="text-xs sm:text-sm md:text-lg font-semibold border-2 border-green-500 text-green-500 px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full">
                {subject}
              </span>
              <span className="text-xs sm:text-sm md:text-lg font-semibold bg-green-100 text-green-700 px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full">
                {skill}
              </span>
              <span className="text-xs sm:text-sm md:text-lg font-semibold bg-[#5BBC2E] text-white px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full flex items-center gap-1 md:gap-2">
                <FaRegStar className="text-sm sm:text-base md:text-lg" /> {rating}
              </span>
              <span className="text-xs sm:text-sm md:text-lg font-semibold bg-blue-100 text-blue-700 px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full">
                {experienceLevel}
              </span>
              <span className="text-xs sm:text-sm md:text-lg font-semibold bg-purple-100 text-purple-700 px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full">
                {studyMode}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm sm:text-base md:text-xl">
              {name} is a highly skilled partner in <strong>{skill}</strong> and specializes in <strong>{subject}</strong>. 
              Available for <strong>{studyMode}</strong> study sessions.
            </p>

            {/* Separator */}
            <div className="my-6 border-t-3 border-[#5BBC2E] rounded-full"></div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4 text-gray-700 text-sm sm:text-base md:text-lg">
            <div className="flex items-center gap-2 md:gap-3">
              <FaEnvelope className="text-green-500" /> {email}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaMapMarkerAlt className="text-red-500" /> {location}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaClock className="text-yellow-500" /> {availabilityTime}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaUsers className="text-blue-500" /> {partnerCount} Partner(s)
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 md:mt-8">
            <button className="w-full border-3 hover:border-[#5BBC2E] hover:bg-white hover:text-[#5BBC2E] font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-md transition-all duration-300 bg-[#5BBC2E] text-white">
              Connect with {name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
