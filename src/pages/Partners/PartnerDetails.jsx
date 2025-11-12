import React, { useContext, useState } from "react";
import { FaRegStar, FaEnvelope, FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxios from "../../Hooks/useAxios";

const PartnerDetails = () => {
  const partnerDetails = useLoaderData();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

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
    _id
  } = partnerDetails;

  const [currentPartnerCount, setCurrentPartnerCount] = useState(partnerCount);
  const [requested, setRequested] = useState(false)

  const handleSendRequest = async () => {
  
    try {
      const response = await axiosInstance.post(`/request/${_id}`, {
        email: user.email,
      });

      if (response.data.success) {
        setCurrentPartnerCount(prev => prev + 1);
        setRequested(true); 
        Swal.fire("Success", response.data.message, "success");
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to send request",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-6">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row border-2 border-green-500">
        <div className="w-full md:w-1/2 p-4">
          <img src={profileImage} alt={name} className="w-full h-full object-cover rounded-sm" />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">{name}</h1>

            <div className="my-6 border-t-3 border-[#5BBC2E] rounded-full"></div>

            <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
              <span className="text-xs sm:text-sm md:text-lg font-semibold border-2 border-green-500 text-green-500 px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full">{subject}</span>
              <span className="text-xs sm:text-sm md:text-lg font-semibold bg-green-100 text-green-700 px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full">{skill}</span>
              <span className="text-xs sm:text-sm md:text-lg font-semibold bg-[#5BBC2E] text-white px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full flex items-center gap-1 md:gap-2">
                <FaRegStar className="text-sm sm:text-base md:text-lg" /> {rating}
              </span>
              <span className="text-xs sm:text-sm md:text-lg font-semibold bg-blue-100 text-blue-700 px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full">{experienceLevel}</span>
              <span className="text-xs sm:text-sm md:text-lg font-semibold bg-purple-100 text-purple-700 px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full">{studyMode}</span>
            </div>

            <p className="text-gray-700 text-sm sm:text-base md:text-xl">
              {name} is a highly skilled partner in <strong>{skill}</strong> and specializes in <strong>{subject}</strong>. Available for <strong>{studyMode}</strong> study sessions.
            </p>

            <div className="my-6 border-t-3 border-[#5BBC2E] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4 text-gray-700 text-sm sm:text-base md:text-lg">
            <div className="flex items-center gap-2 md:gap-3"><FaEnvelope className="text-green-500" /> {email}</div>
            <div className="flex items-center gap-2 md:gap-3"><FaMapMarkerAlt className="text-red-500" /> {location}</div>
            <div className="flex items-center gap-2 md:gap-3"><FaClock className="text-yellow-500" /> {availabilityTime}</div>
            <div className="flex items-center gap-2 md:gap-3"><FaUsers className="text-blue-500" /> {currentPartnerCount} Partner(s)</div>
          </div>

          <div className="mt-6 md:mt-8">
            <button
              onClick={handleSendRequest}
              disabled={requested}
              className={`w-full font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-md transition-all duration-300 
                ${requested ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#5BBC2E] text-white hover:border-3 hover:border-[#5BBC2E] hover:bg-white hover:text-[#5BBC2E]"}
              `}
            >
              {requested ? "Request Sent" : `Connect with ${name}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
