import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const MainLayout: React.FC = () => {
    return (
        <div className={`grid grid-cols-12`}>
            {/* side bar */}
            <div className="col-span-2 h-[calc(100vh-36px)] overflow-x-hidden bg-[#F5E9DF] my-4 rounded-r-xl">
                <Sidebar />
            </div>

            <div className="col-span-10">
                {/* header */}
                <DashboardHeader />

                {/* main container with header */}
                <div className="px-4 h-[calc(100vh-100px)]">
                    <div className="h-full overflow-y-auto rounded-md py-4">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* main container with header */}
            {/* <div className="col-span-10 bg-[#FFF4E9]">
                <div className="px-4 h-[calc(100vh-97px)]">
                    <div className="h-full overflow-y-auto rounded-md pt-4">
                        <Outlet />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default MainLayout;
