import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewCard = ({ comment }) => {
  const { name, image, rating, review } = comment;
  const totalStars = 5;
  const stars = Array.from({ length: totalStars }, (_, index) =>
    index < rating ? <FaStar key={index} className="text-yellow-500" /> : <FaRegStar key={index} className="text-yellow-500" />
  );

  return (
    <div className="card bg-white shadow-xl border border-[#5BBC2E] p-6 lg:w-[500px] w-[300px] space-x-5 h-[300px] mx-auto">
      <div className="flex flex-col items-center text-center">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full mb-4 shadow-md"
        />
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>

        <div className="flex justify-center items-center my-2 space-x-1">
          {stars}
        </div>

        <p className="text-gray-600 lg:text-base text-sm leading-relaxed">
          {review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
