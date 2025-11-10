import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router';

const TopPartners = ({ data }) => {
  const { _id, name, skill, subject, rating } = data;

  return (
    <div className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl hover:shadow-2xl transition-transform hover:scale-105 duration-300 bg-white w-full max-w-4xl mx-auto">
      
      {/* Image Left */}
      <div className="w-full h-64 md:h-auto ">
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
        <div className="my-3 border-t-4 border-green-500 rounded-full"></div>

        {/* Badges stacked in column */}
        <div className="grid grid-cols-1 gap-2 mt-2">
          <span className="text-sm font-semibold border-2 border-green-500 text-green-500 px-2 py-1 rounded-full text-center">
            {subject}
          </span>
          <span className="text-sm font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full text-center">
            {skill}
          </span>
          <span className="text-sm font-semibold bg-green-500 text-white px-2 py-1 rounded-full flex items-center justify-center gap-1">
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
          className="w-full btn md:w-auto border-2 border-green-500 bg-white text-green-500 font-semibold px-4 py-2 rounded-sm shadow-md transition-all duration-300 hover:bg-green-500 hover:text-white text-sm md:text-base"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default TopPartners;
