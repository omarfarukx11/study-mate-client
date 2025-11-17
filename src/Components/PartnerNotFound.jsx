import React from 'react';
import { Link } from 'react-router';

const PartnerNotFound = () => {
    return (
        <div className='flex items-center justify-center flex-col '>
            <title>StudyMate - Not Found</title>
            <img className='mx-auto w-[30%]' src="https://i.ibb.co.com/JjntHKkn/404-error-with-cute-animal-concept-illustration-114360-1900.jpg" alt="" />

            <Link to={'/'} className="w-full btn mt-10 md:w-auto border-2 border-primary bg-base-100 text-primary font-semibold px-4 py-2 rounded-sm shadow-md transition-all duration-300 hover:bg-primary hover:text-white text-sm md:text-base"
         >Go Back </Link>
        </div>
    );
};

export default PartnerNotFound;