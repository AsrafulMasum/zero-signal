import { Card } from "antd";
import React from "react";

interface ActivityItem {
    title: string;
    subtitle: string;
    status: "Success" | "Canceled" | "Warning";
    time: string;
}

const statusStyles: Record<ActivityItem["status"], string> = {
    Success: "bg-[#23C25D] text-white",
    Canceled: "bg-[#FF4D4D] text-white",
    Warning: "bg-[#FFC727] text-white",
};

const activities: ActivityItem[] = [
    {
        title: "Key collected from Dubai Marina Locker #3",
        subtitle: "Gust – Ahmed Al Mansoori",
        status: "Success",
        time: "12 mins ago",
    },
    {
        title: "Key collected from Dubai Marina Locker #3",
        subtitle: "Partner – Marina Properties",
        status: "Success",
        time: "12 mins ago",
    },
    {
        title: "Key returned to Downtown Locker #8",
        subtitle: "Cleaner – Sarah Khan",
        status: "Canceled",
        time: "5 mins ago",
    },
    {
        title: "Payment received - Monthly subscription",
        subtitle: "Host – Dubai Stays",
        status: "Success",
        time: "5 mins ago",
    },
    {
        title: "Locker maintenance required",
        subtitle: "System Alert – JBR Unit 5",
        status: "Warning",
        time: "5 mins ago",
    },
];

const RecentActivity: React.FC = () => {
    return (
        <Card className="w-full bg-white rounded-xl shadow-sm col-span-2">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Recent Activity
            </h3>

            <div className="flex flex-col divide-y">
                {activities.map((item, index) => (
                    <div key={index} className="py-4 flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="font-medium text-[#1A1A1A] text-sm">
                                {item.title}
                            </p>
                            <p className="text-[#8A8A8A] text-sm mt-1">{item.subtitle}</p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <span
                                className={`px-3 py-0.5 rounded-md text-xs font-semibold ${statusStyles[item.status]}`}
                            >
                                {item.status}
                            </span>
                            <span className="text-xs text-[#8A8A8A]">{item.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default RecentActivity;
