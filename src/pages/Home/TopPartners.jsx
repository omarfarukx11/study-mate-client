import React from 'react';
import { FaRegStar } from 'react-icons/fa';

const TopPartners = ({ data }) => {
  const { name, skill, subject, rating } = data;

  return (
    <div className="flex flex-col md:flex-row border border-[#5BBC2E] rounded-lg overflow-hidden shadow-lg bg-white">
      
      {/* Image Left - 50% */}
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <img
          src="https://i.ibb.co/Z6kJVWq4/pexels-gabby-k-6237989.jpg"
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description Right - 50% */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-semibold border-2 border-[#5BBC2E] text-[#5BBC2E] px-2 py-1 rounded">
            {subject}
          </span>
          <span className="text-sm font-semibold bg-[#5BBC2E]/20 text-[#5BBC2E] px-2 py-1 rounded">
            {skill}
          </span>
          <span className="text-sm font-semibold bg-pink-500/30 px-2 py-1 rounded flex items-center gap-1">
            <FaRegStar /> {rating}
          </span>
        </div>

        <p className="text-gray-500 mt-2">
          This partner is highly skilled in {skill} and specializes in {subject}.
        </p>
      </div>

    </div>
  );
};

export default TopPartners;
