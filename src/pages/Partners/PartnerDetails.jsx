import React, { useContext, useState, useEffect } from "react";
import {
  FaRegStar,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import { useLoaderData, useNavigate, useLocation } from "react-router"; // Added useLocation
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxios from "../../Hooks/useAxios";
import NotFound from "../../Components/NotFound";

const PartnerDetails = () => {
  const partnerDetails = useLoaderData();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation(); // Initialize location to track this page's URL

  // State for request status and UI feedback
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fallback for safety
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
    location: partnerLocation,
    partnerCount,
    profileImage,
    studyMode,
    _id,
  } = partnerDetails;

  const [currentPartnerCount, setCurrentPartnerCount] = useState(partnerCount);

  // Check if user has already sent a request
  useEffect(() => {
    if (user?.email && _id) {
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
    }
  }, [axiosInstance, _id, user?.email]);

  const handleSendRequest = async () => {
    // FIX: If not logged in, send the user to login and SAVE THIS PAGE in state
    if (!user) {
      Swal.fire({
        title: "Please Login",
        text: "You need to be logged in to send a collaboration request.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(`/request/${_id}`, {
        email: user?.email,
      });

      if (response.data.success) {
        setCurrentPartnerCount((prev) => prev + 1);
        setRequested(true);
        Swal.fire("Success", "Collaboration request sent successfully!");
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to send request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/10 py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* --- LEFT: IMAGE SECTION --- */}
          <div className="w-full lg:w-[45%] relative p-6">
            <div className="h-[400px] lg:h-[600px] w-full">
              <img
                src={profileImage}
                alt={name}
                className="w-full h-full object-cover rounded-2xl shadow-inner"
              />
              <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 font-black">
                <FaRegStar className="text-yellow-500" />
                <span>{rating}</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: CONTENT SECTION --- */}
          <div className="w-full lg:w-[55%] p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                Verified Study Partner
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-neutral mb-2">
                {name}
              </h1>
              <p className="text-lg text-gray-500 font-medium italic">
                Expertise in {subject}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[subject, experienceLevel, studyMode, skill].map((tag, i) => (
                <span key={i} className="px-4 py-1.5 rounded-lg bg-gray-100 font-bold text-xs uppercase tracking-wider border border-gray-200">
                  {tag}
                </span>
              ))}
            </div>

            {/* Bio Box */}
            <div className="bg-primary/5 rounded-2xl p-6 mb-8 border border-primary/10">
              <p className="text-neutral leading-relaxed">
                Connect with <span className="font-bold">{name}</span> to boost your productivity. 
                With a focus on <span className="text-primary font-bold">{skill}</span>, 
                you can expect high-quality {studyMode} sessions tailored to your goals.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <StatItem icon={<FaEnvelope />} label="Email" value={email} color="text-primary" />
              <StatItem icon={<FaMapMarkerAlt />} label="Location" value={partnerLocation} color="text-red-500" />
              <StatItem icon={<FaClock />} label="Availability" value={availabilityTime} color="text-orange-500" />
              <StatItem icon={<FaUsers />} label="Active Network" value={`${currentPartnerCount} Partners`} color="text-blue-500" />
            </div>

            {/* Main Action Button */}
            <button
              onClick={handleSendRequest}
              disabled={requested || loading}
              className={`w-full py-4 rounded-4xl text-sm font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg
                ${requested 
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                  : "bg-primary text-white hover:bg-neutral hover:shadow-primary/30"
                }`}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : requested ? (
                "Request Already Sent"
              ) : (
                `Collaborate with ${name.split(" ")[0]}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Component
const StatItem = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4">
    <div className={`w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-bold text-neutral truncate max-w-[150px]">{value}</p>
    </div>
  </div>
);

export default PartnerDetails;