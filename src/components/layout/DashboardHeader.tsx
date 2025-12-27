import { FiBell } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useProfileQuery } from '../../redux/apiSlices/authSlice';
import { imageUrl } from '../../redux/api/baseApi';
import { useGetNotificationQuery } from '../../redux/apiSlices/notificationSlice';
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

export default function DashboardHeader() {
    const { data: profileRes } = useProfileQuery({});
    const profile = profileRes?.data;

    const { data, refetch } = useGetNotificationQuery({});
    const notifications = data?.data;

    const socket = useMemo(() => io(imageUrl), []);

    useEffect(() => {
        socket.on(`notification::${profile?._id}`, (data) => {
            console.log(data);

            refetch();
        });
    }, [socket, profile?._id]);

    return (
        <div>
            <div className="bg-[#F5E9DF] px-4 mt-4 rounded-xl mx-4">
                <div className="flex items-center justify-end gap-4 py-4">
                    {/* Right section - Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Notifications */}
                        <Link to="/notification">
                            <button className="relative p-2 text-[#223047] hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                <FiBell className="h-6 w-6" />
                                <span className="absolute -top-1 -right-0 flex items-center justify-center bg-primary text-white text-xs font-semibold rounded-full w-6 h-6 shadow-md border-2 border-white">
                                    {notifications?.unreadCount}
                                </span>
                            </button>
                        </Link>
                        {/* Profile */}
                        <div className="flex items-center space-x-3">
                            <Link to="/profile">
                                <img
                                    src={
                                        profile?.image?.startsWith('http')
                                            ? profile?.image
                                            : `${imageUrl}${profile?.image}`
                                    }
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <span className="text-sm sm:text-base font-semibold text-gray-900">
                                    {profile?.name}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-400">{profile?.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
