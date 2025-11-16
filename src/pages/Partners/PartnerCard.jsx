import React from "react";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router";

const PartnerCard = ({ partner }) => {
  const { _id, name, skill, subject, rating ,profileImage} = partner;

  return (
    <div className="flex flex-col md:flex-row rounded-lg border border-gray-100  overflow-hidden shadow-2xl hover:shadow-2xl transition-transform hover:scale-105 duration-300 bg-base-100 w-full max-w-4xl mx-auto text-neutral-content">
      <div className="w-full h-full">
        <img
          src={profileImage}
          alt={name}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>

      <div className="w-full  p-4 flex flex-col justify-center gap-2 mt-4 md:mt-0">
        <h1 className="text-xl md:text-2xl font-bold capitalize">{name}</h1>

        <div className="my-3 border-t-4 border-primary rounded-full"></div>

        <div className="grid grid-cols-1 gap-2 mt-2">
          <span className="text-sm font-semibold border-2 border-primary text-primary px-2 py-1 rounded-full text-center">
            {subject}
          </span>
          <span className="text-sm font-semibold bg-primary/20 text-primary px-2 py-1 rounded-full text-center">
            {skill}
          </span>
          <span className="text-sm font-semibold bg-primary text-white px-2 py-1 rounded-full flex items-center justify-center gap-1">
            <FaRegStar className="text-xs" /> {rating}
          </span>
        </div>

        <p className="text-gray-600 text-sm mt-2">
          This partner is highly skilled in <strong>{skill}</strong> and specializes in <strong>{subject}</strong>.
        </p>

        <Link
          to={`/partnerDetails/${_id}`}
          className="w-full btn md:w-auto border-2 border-primary bg-base-100 text-primary font-semibold px-4 py-2 rounded-sm shadow-md transition-all duration-300 hover:bg-primary hover:text-white text-sm md:text-base"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PartnerCard;
