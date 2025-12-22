import TotalEarning from './TotalEarning';
import TotalUserChart from './TotalUserChart';
import { GiKeyring, GiMoneyStack } from 'react-icons/gi';
import { BsHouseLock } from 'react-icons/bs';
import { PiUsersThree } from 'react-icons/pi';
import PieChartComp from './PieChartComp';
import RecentActivity from './RecentActivity';

export const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; className?: string }> = ({
    icon,
    title,
    value,
    className,
}) => (
    <div className="rounded-lg shadow-sm border border-gray-200 p-2 2xl:p-4">
        <div className="flex items-center justify-between gap-2">
            <div>
                <p className="text-secondaryText">{title}</p>
                <p className="text-xl font-semibold text-textBlack pt-1">{value}</p>
            </div>
            <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center text-3xl ${className} 
                `}
            >
                {icon}
            </div>
        </div>
    </div>
);

const App: React.FC = () => {
    return (
        <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-4">
                <StatCard
                    icon={<BsHouseLock />}
                    title="Total Lockers"
                    value="68"
                    className="bg-[#095CC71A] text-[#095CC7]"
                />
                <StatCard
                    icon={<GiKeyring />}
                    title="Active Keys"
                    value="169"
                    className="bg-[#2E4F3E1A] text-[#2E4F3E]"
                />
                <StatCard
                    icon={<PiUsersThree />}
                    title="Total Users"
                    value="3,802"
                    className="bg-[#00A63E1A] text-[#00A63E]"
                />
                <StatCard
                    icon={<GiMoneyStack />}
                    title="Monthly Revenue"
                    value="AED 45,085"
                    className="bg-[#9810FA1A] text-[#9810FA]"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Revenue Chart */}
                <TotalEarning />

                {/* Users */}
                <TotalUserChart />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <RecentActivity />
                <PieChartComp />
            </div>
        </div>
    );
};

export default App;
