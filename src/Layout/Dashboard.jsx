import React from 'react';
import DasNav from '../Components/DashNav';
import { Outlet } from 'react-router';

const Dashboard = () => {
    return (
        <div>
            <DasNav></DasNav>
            <div className='mt-[88px]'>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;