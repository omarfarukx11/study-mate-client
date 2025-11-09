import React from 'react';
import Navbar from '../../Components/Navbar';
import Banner from './Banner';
import TopPartners from './TopPartners';
import { useLoaderData } from 'react-router';



const Home = () => {
    const data = useLoaderData()
    console.log(data)


    return (
        <div>
            <div className='h-[200px] my-5 font-bold bg-[#f5f5f5] flex items-center justify-center text-6xl'> 
                <h1>Study Mate</h1>
            </div>
            <Banner></Banner>
            <TopPartners data={data}></TopPartners>
        </div>
    );
};

export default Home;