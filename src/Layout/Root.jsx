import React from 'react';
import Home from '../pages/Home/Home';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const Root = () => {
    return (
        <div className='w-9/12 mx-auto'>
            <Navbar></Navbar>
             <div className='w-11/12 mx-auto border-2'>
                <Outlet></Outlet>
             </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;