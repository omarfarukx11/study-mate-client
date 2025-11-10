import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router';

const TopPartners = ({data}) => {
    const {name ,profileImage , skill , subject, rating} = data;
    return (
        <div className="">
        <img
          className="w-full mx-auto md:h-[350px] h-[150px] rounded-lg mb-3 shadow-md"
          src="https://i.ibb.co/Z6kJVWq4/pexels-gabby-k-6237989.jpg"
          alt={''}
        />

        <h1 className="font-bold text-xl py-2">
          {name}
        </h1>

          <h2 className="text-xs font-semibold   border-2 border-[#5BBC2E] text-[#5BBC2E] px-2 py-1 rounded">
            {subject}
          </h2>
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-xs font-semibold bg-purple-500/30 px-2 py-1 rounded">
            {skill}
          </h2>
          <h2 className="text-xs font-semibold bg-pink-500/30 px-2 py-1 rounded flex gap-1">
            <FaRegStar></FaRegStar> {rating}
          </h2>
        </div>

    </div>
    );
};

export default TopPartners;