import React from 'react';

const ReviewCard = ({comment}) => {

    const {name , image , rating ,review} = comment
    return (
         <div className="card bg-white shadow-xl border border-[#5BBC2E] p-6 lg:w-[500px] w-[300px] space-x-5 h-[300px]  mx-auto ">
        <div className="flex flex-col items-center text-center">
          <img
            src={image}
            alt=''
            className="w-20 h-20 rounded-full mb-4 shadow-md"
          />
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>

          <div className="flex justify-center text-yellow-500 my-2">
           <p>{rating}</p>
          </div>

          <p className="text-gray-600 lg:text-base text-sm leading-relaxed ">
          {review}
          </p>
        </div>
      </div>
    );
};

export default ReviewCard;