import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className='2xl:w-[1536px] mx-auto min-h-screen flex items-center justify-center flex-col'>
            <img className='mx-auto w-[40%]' src="https://i.ibb.co.com/JjntHKkn/404-error-with-cute-animal-concept-illustration-114360-1900.jpg" alt="" />
             <Link to={'/'} className="w-full btn md:w-auto border-2 border-primary bg-white text-primary font-semibold px-4 py-2 rounded-sm shadow-md transition-all duration-300 hover:bg-primary hover:text-white text-sm md:text-base"
         >Go Back </Link>
        </div>
    );
};

export default NotFound;


