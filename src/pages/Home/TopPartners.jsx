import React from 'react';
import { FaRegStar } from 'react-icons/fa';

const TopPartners = ({ data }) => {
  const { name, skill, subject, rating } = data;

  return (
    <div className="flex flex-col md:flex-row  rounded-sm overflow-hidden shadow-lg   hover:shadow-2xl transition-transform hover:scale-105 duration-300  p-4">
      
      {/* Image Left */}
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <img
          src="https://i.ibb.co/Z6kJVWq4/pexels-gabby-k-6237989.jpg"
          alt={name}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>

      {/* Description Right */}
      <div className="w-full md:w-1/2 pl-6 flex flex-col justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>

        <div className="flex flex-col gap-2">
          {/* Subject */}
          <span className="text-sm font-semibold border-2 border-[#5BBC2E] text-[#5BBC2E] px-2 py-1 rounded">
            {subject}
          </span>

          {/* Skill */}
          <span className="text-sm font-semibold bg-[#5BBC2E]/20 text-[#5BBC2E] px-2 py-1 rounded">
            {skill}
          </span>

          {/* Rating */}
          <span className="text-sm font-semibold bg-[#5BBC2E] text-white px-2 py-1 rounded flex items-center gap-1">
            <FaRegStar /> {rating}
          </span>
        </div>

        <p className="text-gray-600 mt-2">
          This partner is highly skilled in {skill} and specializes in {subject}.
        </p>
    <button className='btn bg-[#5BBC2E] text-white hover:text-black hover:bg-white hover:border hover:border-2 hover:border-[#5BBC2E] '>View Profile</button>
      </div>

    </div>
  );
};

export default TopPartners;
