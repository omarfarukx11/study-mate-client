import React from 'react';
import Home from '../pages/Home/Home';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const Root = () => {
    return (
        <div >
            <Navbar></Navbar>
             <div className='w-[1536px]  mt-[100px] mx-auto min-h-screen mt-[100px]'>
                <Outlet></Outlet>
             </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;