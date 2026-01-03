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
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-secondary/20 py-20 px-4 md:px-6">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-base-100 rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col lg:flex-row relative">
          {/* --- LEFT: IMAGE SECTION --- */}
          <div className="w-full lg:w-[40%] relative p-6 lg:p-8">
            <div className="sticky top-0 h-[400px] lg:h-full min-h-[450px]">
              <img
                src={profileImage}
                alt={name}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              {/* Floating Rating Badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 font-black">
                <FaRegStar className="text-yellow-500" />
                <span>{rating}</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: CONTENT SECTION --- */}
          <div className="w-full lg:w-[60%] p-8 md:p-14 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                Available Partner
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-neutral mb-2 tracking-tight">
                {name}
              </h1>
              <p className="text-lg text-gray-400 font-medium italic">
                Specializing in {subject}
              </p>
            </div>

            {/* Badges Grid */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="px-5 py-2 rounded-xl bg-primary/10 text-primary font-bold text-sm shadow-lg shadow-primary/20">
                {subject}
              </span>
              <span className="px-5 py-2 rounded-xl bg-primary/10 text-primary font-bold text-sm border border-primary/20">
                {experienceLevel}
              </span>

              <span className="px-5 py-2 rounded-xl bg-primary/10 text-primary font-bold text-sm border border-primary/20">
                {studyMode}
              </span>

              <span className="px-5 py-2 rounded-xl bg-primary/10 text-primary font-bold text-sm border border-primary/20">
                {skill}
              </span>
            </div>

            {/* Bio */}
            <div className="bg-gray-50 rounded-3xl p-6 mb-10 border border-gray-100">
              <p className="text-gray-600 leading-relaxed text-lg">
                Join <span className="text-neutral font-bold">{name}</span> for
                an immersive study experience. Expertise in{" "}
                <span className="text-primary font-semibold">{skill}</span>{" "}
                ensures a productive partnership through{" "}
                <span className="underline decoration-primary/30 underline-offset-4">
                  {studyMode}
                </span>{" "}
                sessions.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 mb-12">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                    Email Address
                  </p>
                  <p className="font-semibold text-neutral">{email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                    Location
                  </p>
                  <p className="font-semibold text-neutral">{location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                  <FaClock />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                    Availability
                  </p>
                  <p className="font-semibold text-neutral">
                    {availabilityTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <FaUsers />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                    Active Network
                  </p>
                  <p className="font-semibold text-neutral">
                    {currentPartnerCount} Partners
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleSendRequest}
              disabled={requested}
              className={`group relative overflow-hidden w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm transition-all duration-500 shadow-xl
                ${
                  requested
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-neutral text-white hover:bg-primary hover:shadow-primary/40 active:scale-95"
                }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {requested
                  ? "Request Already Sent"
                  : `Collaborate with ${name.split(" ")[0]}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
