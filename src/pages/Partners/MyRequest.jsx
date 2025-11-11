import React from "react";
import { FaRegStar } from "react-icons/fa";

const MyRequest = ({ request, index }) => {
  // Alternate background colors for odd/even cards
  const bgColor = index % 2 === 0 ? "bg-white" : "bg-gray-100";

  return (
    <div className={`${bgColor} shadow-lg rounded-lg border border-e-red-600 p-6 mb-6 flex flex-col md:flex-row gap-6  `}>
      
      {/* Partner Image */}
      <div className="w-full md:w-1/4 flex justify-center md:justify-start">
        <img
          src={request.profileImage || "https://via.placeholder.com/150"}
          alt={request.partnerName}
          className="w-32 h-32 rounded-full border-2 border-green-500 object-cover"
        />
      </div>

      {/* Partner Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-800">{request.partnerName}</h2>
          <p className="text-gray-600 mt-1">{request.subject}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-sm md:text-base font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">{request.skill}</span>
            <span className="text-sm md:text-base font-semibold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-1">
              <FaRegStar /> {request.rating}
            </span>
            <span className="text-sm md:text-base font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{request.studyMode}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-6">
          <button className="w-full md:w-auto btn bg-green-500 text-white hover:bg-white hover:text-green-500 hover:border hover:border-green-500 transition-all duration-300">
            Update
          </button>
          <button className="w-full md:w-auto btn bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500 transition-all duration-300">
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRequest;
