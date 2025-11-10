import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router';

const PartnerCard = ({ partner }) => {
  const { _id, name, skill, subject, rating } = partner;
  console.log(partner)

  return (
    <div className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl hover:shadow-2xl transition-transform hover:scale-105 duration-300 bg-white w-full max-w-4xl mx-auto">
      
      {/* Image Left */}
      <div className="w-full h-64 md:h-auto">
        <img
          src="https://i.ibb.co/Z6kJVWq4/pexels-gabby-k-6237989.jpg"
          alt={name}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>

      {/* Description Right */}
      <div className="w-full p-4 flex flex-col justify-center gap-2 mt-4 md:mt-0">
        {/* Name */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">{name}</h1>

        {/* Separator */}
        <div className="my-3 border-t-4 border-[#5BBC2E] rounded-full"></div>

        {/* Badges stacked in column */}
        <div className="grid grid-cols-1 gap-2 mt-2">
          <span className="text-sm font-semibold border-2 border-[#5BBC2E] text-[#5BBC2E] px-2 py-1 rounded-full text-center">
            {subject}
          </span>
          <span className="text-sm font-semibold bg-[#5BBC2E]/20 text-[#5BBC2E] px-2 py-1 rounded-full text-center">
            {skill}
          </span>
          <span className="text-sm font-semibold bg-[#5BBC2E] text-white px-2 py-1 rounded-full flex items-center justify-center gap-1">
            <FaRegStar className="text-xs" /> {rating}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2">
          This partner is highly skilled in <strong>{skill}</strong> and specializes in <strong>{subject}</strong>.
        </p>

        {/* View Profile Button */}
        <Link
          to={`/partnerDetails/${_id}`}
          className="w-full btn md:w-auto border-2 border-[#5BBC2E] bg-white text-[#5BBC2E] font-semibold px-4 py-2 rounded-sm shadow-md transition-all duration-300 hover:bg-[#5BBC2E] hover:text-white text-sm md:text-base"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PartnerCard;
