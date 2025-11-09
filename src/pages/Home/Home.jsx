import React from 'react';
import Navbar from '../../Components/Navbar';
import Banner from './Banner';

const Home = () => {
    return (
        <div>
            <div className='h-[200px] my-5 font-bold bg-[#f5f5f5] flex items-center justify-center text-6xl'> 
                <h1>Study Mate</h1>
            </div>
            <Banner></Banner>
        </div>
    );
};

export default Home;