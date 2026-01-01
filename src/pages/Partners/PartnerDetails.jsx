import React, { useContext, useState, useEffect } from "react";
import {
  FaRegStar,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxios from "../../Hooks/useAxios";
import NotFound from "../../Components/NotFound";

const PartnerDetails = () => {
  const partnerDetails = useLoaderData();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  if (!partnerDetails || !partnerDetails._id) {
    return <NotFound />;
  }

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
    _id,
  } = partnerDetails;

  const [requested, setRequested] = useState(false);
  const [currentPartnerCount, setCurrentPartnerCount] = useState(partnerCount);
  const navigate = useNavigate()

  useEffect(() => {
    const checkRequest = async () => {
      try {
        const res = await axiosInstance.get(`/request/check/${_id}`, {
          params: { email: user.email },
        });
        setRequested(res.data.requested);
      } catch (err) {
        console.error("Error checking request:", err);
      }
    };
    checkRequest();
  }, [axiosInstance, _id, user?.email]);

  const handleSendRequest = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const response = await axiosInstance.post(`/request/${_id}`, {
        email: user?.email,
      });

      if (response.data.success) {
        setCurrentPartnerCount((prev) => prev + 1);
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
    <div className="bg-secondary w-full">
      <div className="flex items-center justify-center p-4 my-20 md:p-6 text-neutral-content">
        <title>Partner Details</title>
        <div className="2xl:w-[1500px] 2xl:h-[600px] mx-auto bg-base-100 rounded-lg shadow-2xl overflow-hidden flex flex-col lg:flex-row border-2 border-primary">
          <div className="w-full lg:w-1/2 p-4">
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover rounded-sm"
            />
          </div>

          <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-3 lg:mb-4">{name}</h1>
                <p className="flex items-center gap-2 text-3xl bg-primary text-white px-5 py-2 rounded-4xl"><FaRegStar className="text-sm sm:text-base lg:text-lg" />{" "}{rating}</p>
              </div>

              <div className="my-6 border-t-3 border-primary rounded-full"></div>

              <div className="flex gap-2 mb-4 flex-wrap 2xl:flex-nowrap">
                <span className="text-xs sm:text-sm md:text-lg font-semibold border-2 border-primary text-primary px-2 sm:px-3 lg:px-4 py-1 lg:py-2 rounded-full">
                  {subject}
                </span>
                <span className="text-xs sm:text-sm lg:text-lg font-semibold bg-[#E8F8E2] text-primary px-2 sm:px-3 lg:px-4 py-1 lg:py-2 rounded-full">
                  {skill}
                </span>
                <span className="text-xs sm:text-sm lg:text-lg font-semibold bg-blue-100 text-blue-700 px-2 sm:px-3 lg:px-4 py-1 lg:py-2 rounded-full">
                  {experienceLevel}
                </span>
                <span className="text-xs sm:text-sm lg:text-lg font-semibold bg-purple-100 text-purple-700 px-2 sm:px-3 lg:px-4 py-1 lg:py-2 rounded-full">
                  {studyMode}
                </span>
              </div>

              <p className="text-gray-500 text-sm sm:text-base md:text-xl">
                {name} is a highly skilled partner in <strong>{skill}</strong>{" "}
                and specializes in <strong>{subject}</strong>. Available for{" "}
                <strong>{studyMode}</strong> study sessions.
              </p>

              <div className="= my-4 border-t-3 border-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-sm sm:text-base md:text-lg">
              <div className="flex items-center gap-2 md:gap-3">
                <FaEnvelope className="text-primary" /> {email}
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <FaMapMarkerAlt className="text-red-500" /> {location}
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <FaClock className="text-yellow-500" /> {availabilityTime}
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <FaUsers className="text-blue-500" /> {currentPartnerCount}{" "}
                Partner(s)
              </div>
            </div>

            <div className="mt-6 md:mt-8 ">
              <button
                onClick={handleSendRequest}
                disabled={requested}
                className={`w-full md:w-auto border-2 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-sm shadow-md transition-all duration-300 text-sm md:text-base
              ${
                requested
                  ? "bg-gray-400 border-gray-400 text-white cursor-not-allowed"
                  : "bg-base-100 border-primary text-primary hover:bg-primary hover:text-white"
              }`}
              >
                {requested ? "Request Sent" : `Connect with ${name}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
