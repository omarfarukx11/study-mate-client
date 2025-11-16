import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewCard = ({ comment }) => {
  const { name, image, rating, review } = comment;
  const totalStars = 5;
  const stars = Array.from({ length: totalStars }, (_, index) =>
    index < rating ? <FaStar key={index} className="text-yellow-500" /> : <FaRegStar key={index} className="text-yellow-500" />
  );

  return (
    <div className="card bg-base-100 shadow-xl p-6 lg:w-[500px] w-[200px] space-x-5 lg:h-[300px] h-[200px] mx-auto text-neutral-content">
      <div className="flex flex-col items-center text-center">
        <img
          src={image}
          alt={name}
          className="lg:w-20 lg:h-20 w-10 h-10 rounded-full mb-4 shadow-md"
        />
        <h3 className="lg:text-xl text-sm font-semibold text-neutral-content">{name}</h3>

        <div className="flex justify-center text-[10px] items-center my-2 space-x-1">
          {stars}
        </div>

        <p className="text-gray-500 lg:text-base text-[8px] leading-relaxed">
          {review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
