import { Bell } from 'lucide-react';
import { useGetNotificationQuery, useReadAllNotificationMutation } from '../../../redux/apiSlices/notificationSlice';
import toast from 'react-hot-toast';
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { imageUrl } from '../../../redux/api/baseApi';
import { useProfileQuery } from '../../../redux/apiSlices/authSlice';

type ApiNotification = {
    _id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
};

type NotificationGroup = {
    timestamp: string;
    items: ApiNotification[];
};

export default function NotificationPage() {
    const { data, isLoading, refetch } = useGetNotificationQuery({});
    const notifications: ApiNotification[] = data?.data?.data || [];

    const { data: profileRes } = useProfileQuery({});
    const user = profileRes?.data;

    const [readAllNotification] = useReadAllNotificationMutation();

    // Convert date to Today / Yesterday / Date
    const getTimestampLabel = (date: string) => {
        const notifDate = new Date(date);
        const today = new Date();
        const yesterday = new Date();

        yesterday.setDate(today.getDate() - 1);

        if (notifDate.toDateString() === today.toDateString()) return 'Today';
        if (notifDate.toDateString() === yesterday.toDateString()) return 'Yesterday';

        return notifDate.toLocaleDateString();
    };

    const groupedNotifications: NotificationGroup[] = notifications?.reduce((acc, notif) => {
        const timestamp = getTimestampLabel(notif.createdAt);
        const group = acc.find((g) => g.timestamp === timestamp);

        if (group) {
            group.items.push(notif);
        } else {
            acc.push({ timestamp, items: [notif] });
        }

        return acc;
    }, [] as NotificationGroup[]);

    const hasUnread = notifications.some((n) => !n.isRead);

    const handleReadAll = async () => {
        const res = await readAllNotification({}).unwrap();

        if (res.success) {
            toast.success('All notifications have been marked as read.');
            refetch();
        }
    };

    const socket = useMemo(() => io(imageUrl), []);

    useEffect(() => {
        socket.on(`notification::${user?._id}`, (data) => {
            console.log(data);

            refetch();
        });
    }, [socket, user?._id]);

    if (isLoading) {
        return <p className="p-6 text-gray-500">Loading notifications...</p>;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <button
                    onClick={handleReadAll}
                    disabled={!hasUnread}
                    className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-60"
                >
                    Mark all as read
                </button>
            </div>

            {/* Notifications */}
            {groupedNotifications.map((group) => (
                <div key={group.timestamp}>
                    {/* Group Header */}
                    <div className="px-6 py-3">
                        <p className="text-sm font-medium text-gray-600">{group.timestamp}</p>
                    </div>

                    {/* Items */}
                    {group.items.map((notif) => {
                        return (
                            <div
                                key={notif._id}
                                className="px-6 py-4 border-b border-gray-100 hover:bg-[#F5E9DF] rounded-lg transition flex gap-4"
                            >
                                {/* Unread Indicator */}
                                <div
                                    className={`w-2.5 h-2.5 mt-4 rounded-full ${
                                        !notif.isRead ? 'bg-primary' : 'bg-transparent'
                                    }`}
                                />

                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                                    🔔
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{notif.title}</p>
                                    <p className="text-sm text-gray-600">{notif.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(notif.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}

            {/* Empty State */}
            {groupedNotifications.length === 0 && (
                <div className="flex flex-col items-center py-12">
                    <Bell className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">No notifications</p>
                    <p className="text-sm text-gray-400">You're all caught up!</p>
                </div>
            )}
        </div>
    );
}
