import { ConfigProvider, Input, Table } from 'antd';
import { useState } from 'react';
import UserModal from './UserModal';
import BlockModal from './BlockModal';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { User } from '../../../types/types';
import { StatCard } from '../dashboard';
import { GiKeyring, GiMoneyStack } from 'react-icons/gi';
import { PiUserCircleLight, PiUsersThree } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const userData: User[] = [
    { key: '1', serialId: 'S-001', userName: 'John Doe', userType: 'Admin', address: 'Locker A1', status: 'Active' },
    { key: '2', serialId: 'S-002', userName: 'Jane Smith', userType: 'User', address: 'Locker A2', status: 'Inactive' },
    {
        key: '3',
        serialId: 'S-003',
        userName: 'Michael Brown',
        userType: 'Moderator',
        address: 'Locker B1',
        status: 'Active',
    },
    {
        key: '4',
        serialId: 'S-004',
        userName: 'Emily Davis',
        userType: 'User',
        address: 'Locker B2',
        status: 'Inactive',
    },
    {
        key: '5',
        serialId: 'S-005',
        userName: 'Chris Wilson',
        userType: 'Admin',
        address: 'Locker C1',
        status: 'Active',
    },
    {
        key: '6',
        serialId: 'S-006',
        userName: 'Sarah Johnson',
        userType: 'User',
        address: 'Locker C2',
        status: 'Inactive',
    },
    { key: '7', serialId: 'S-007', userName: 'David Miller', userType: 'User', address: 'Locker D1', status: 'Active' },
    {
        key: '8',
        serialId: 'S-008',
        userName: 'Olivia Taylor',
        userType: 'Moderator',
        address: 'Locker D2',
        status: 'Inactive',
    },
    {
        key: '9',
        serialId: 'S-009',
        userName: 'Daniel Anderson',
        userType: 'User',
        address: 'Locker E1',
        status: 'Active',
    },
    {
        key: '10',
        serialId: 'S-010',
        userName: 'Sophia Thomas',
        userType: 'Admin',
        address: 'Locker E2',
        status: 'Inactive',
    },
    { key: '11', serialId: 'S-011', userName: 'James Moore', userType: 'User', address: 'Locker F1', status: 'Active' },
    {
        key: '12',
        serialId: 'S-012',
        userName: 'Isabella Martin',
        userType: 'User',
        address: 'Locker F2',
        status: 'Inactive',
    },
    {
        key: '13',
        serialId: 'S-013',
        userName: 'William Lee',
        userType: 'Moderator',
        address: 'Locker G1',
        status: 'Active',
    },
    {
        key: '14',
        serialId: 'S-014',
        userName: 'Mia Harris',
        userType: 'User',
        address: 'Locker G2',
        status: 'Inactive',
    },
    {
        key: '15',
        serialId: 'S-015',
        userName: 'Benjamin Clark',
        userType: 'Admin',
        address: 'Locker H1',
        status: 'Active',
    },
    {
        key: '16',
        serialId: 'S-016',
        userName: 'Charlotte Lewis',
        userType: 'User',
        address: 'Locker H2',
        status: 'Inactive',
    },
];

const statusColorMap = {
    // Pending: { color: '#D48806', bg: '#F7F1CC' },
    Inactive: { color: '#FF4D4F', bg: '#FFD8D7' },
    Active: { color: '#52C41A', bg: '#D9F2CD' },
};

export default function Users({ dashboard }: { dashboard?: boolean }) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    const [userToBlock, setUserToBlock] = useState<User | null>(null);

    // const showUserDetails = (user: User) => {
    //     setSelectedUser(user);
    //     setIsModalVisible(true);
    // };

    const filteredUser = userData?.slice(0, 4);

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    // const showBlockModal = (user: User) => {
    //     setUserToBlock(user);
    //     setIsBlockModalVisible(true);
    // };

    const handleBlockConfirm = () => {
        // Handle block user logic here
        console.log('Blocking user:', userToBlock);
        setIsBlockModalVisible(false);
        setUserToBlock(null);
    };

    const handleBlockCancel = () => {
        setIsBlockModalVisible(false);
        setUserToBlock(null);
    };

    const columns = [
        {
            title: 'Serial ID',
            dataIndex: 'serialId',
            key: 'serialId',
            responsive: ['sm'] as any,
        },
        {
            title: 'Key Id',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'User Type',
            dataIndex: 'userType',
            key: 'userType',
            responsive: ['md'] as any,
        },
        {
            title: 'Locker',
            dataIndex: 'address',
            key: 'address',
            responsive: ['lg'] as any,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: User['status'], record: User) => {
                const key = status as keyof typeof statusColorMap;
                const currentStyle = statusColorMap[key] || { color: '#595959', bg: '#FAFAFA' };

                return (
                    <p
                        className="capitalize px-1 py-0.5 text-center rounded-lg w-28"
                        style={{
                            color: currentStyle.color,
                            backgroundColor: currentStyle.bg,
                        }}
                    >
                        {record?.status}
                    </p>
                );
            },
        },
    ];

    return (
        <>
            {!dashboard && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-4">
                    <StatCard
                        icon={<PiUsersThree />}
                        title="Total Users"
                        value="3,802"
                        className="bg-[#2E4F3E1A] text-[#2E4F3E]"
                    />
                    <StatCard
                        icon={<PiUserCircleLight />}
                        title="Total Hosts"
                        value="68"
                        className="bg-[#00A63E1A] text-[#00A63E]"
                    />
                    <StatCard
                        icon={<GiKeyring />}
                        title="Active Today"
                        value="169"
                        className="bg-[#095CC71A] text-[#095CC7]"
                    />
                    <StatCard
                        icon={<GiMoneyStack />}
                        title="Monthly Revenue"
                        value="AED 45,085"
                        className="bg-[#9810FA1A] text-[#9810FA]"
                    />
                </div>
            )}
            <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title={dashboard ? 'Recent users' : 'Users List'} />

                    {dashboard ? (
                        <Link className="text-primary font-medium" to="/users">
                            See All
                        </Link>
                    ) : (
                        <Input
                            placeholder="Search"
                            className=""
                            style={{ width: 280, height: 40 }}
                            prefix={<i className="bi bi-search"></i>}
                        />
                    )}
                </div>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#2E4F3E',
                        },
                        components: {
                            Table: {
                                headerBg: '#F5E9DF',
                                headerColor: '#2E4F3E',
                                colorBgContainer: '#FAF5E8',
                            },
                        },
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={dashboard ? filteredUser : userData}
                        pagination={dashboard ? false : { pageSize: 8, total: userData.length }}
                        className="custom-table"
                    />
                </ConfigProvider>
            </div>

            <UserModal
                isModalVisible={isModalVisible}
                handleModalClose={handleModalClose}
                selectedUser={selectedUser}
            />

            <BlockModal
                isBlockModalVisible={isBlockModalVisible}
                handleBlockCancel={handleBlockCancel}
                handleBlockConfirm={handleBlockConfirm}
                isUserBlocked={userToBlock?.status !== 'Active'}
            />
        </>
    );
}
