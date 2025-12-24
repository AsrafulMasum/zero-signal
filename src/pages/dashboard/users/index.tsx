import { ConfigProvider, Input, Table } from 'antd';
import { useState } from 'react';
import UserModal from './UserModal';
import BlockModal from './BlockModal';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { User } from '../../../types/types';
import { Link } from 'react-router-dom';
import { CiLock, CiUnlock } from 'react-icons/ci';
import { useChangeStatusUserMutation, useGetUsersQuery } from '../../../redux/apiSlices/userSlice';
import { imageUrl } from '../../../redux/api/baseApi';
import { SlEye } from 'react-icons/sl';
import toast from 'react-hot-toast';

const statusColorMap = {
    delete: { color: '#FF4D4F', bg: '#FFD8D7' },
    active: { color: '#52C41A', bg: '#D9F2CD' },
};

export default function Users({ dashboard }: { dashboard?: boolean }) {
    const [page, setPage] = useState(1);
    const pageSize = 8;
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    const [userToBlock, setUserToBlock] = useState<User | null>(null);

    const { data, refetch } = useGetUsersQuery({ page, limit: pageSize });
    const userData = data?.data;
    const filteredUser = userData?.slice(0, 3);

    const [changeStatusUser] = useChangeStatusUserMutation();

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const handleBlockConfirm = async () => {
        if (!userToBlock?._id) return;
        try {
            const res = await changeStatusUser({ id: userToBlock._id }).unwrap();
            toast.success(res?.message);
            refetch();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong. Please try again.');
        }
        setIsBlockModalVisible(false);
        setUserToBlock(null);
    };

    const handleBlockCancel = () => {
        setIsBlockModalVisible(false);
        setUserToBlock(null);
    };

    interface ColumnConfig {
        title: string;
        dataIndex: string;
        key: string;
        responsive?: ('sm' | 'md' | 'lg' | 'xl' | 'xxl')[];
        render?: (value: any, record: User, index: number) => React.ReactNode;
    }

    const columns: ColumnConfig[] = [
        {
            title: 'Serial No.',
            dataIndex: 'serialNo',
            key: 'serialNo',
            responsive: ['sm'],
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ['sm'],
            render: (_, record) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                    }}
                >
                    <img
                        src={
                            record?.image && record?.image.startsWith('http')
                                ? record?.image
                                : record?.image
                                ? `${imageUrl}${record?.image}`
                                : '/default-avatar.jpg'
                        }
                        className="w-10 h-10 object-cover rounded-full"
                    />

                    <p className="text-sm capitalize">{record?.name}</p>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['sm'],
        },
        {
            title: 'User Role',
            dataIndex: 'role',
            key: 'role',
            responsive: ['md'],
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
                        className="capitalize px-1 py-0.5 rounded-lg w-28"
                        style={{
                            color: currentStyle.color,
                        }}
                    >
                        {record?.status}
                    </p>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record: User) => (
                <div className="flex items-center">
                    <button
                        className="flex justify-center items-center rounded-md"
                        onClick={() => {
                            setSelectedUser(record);
                            setIsModalVisible(true);
                        }}
                        style={{
                            cursor: 'pointer',
                            border: 'none',
                            outline: 'none',
                            width: '40px',
                            height: '32px',
                        }}
                    >
                        <SlEye size={24} className="text-[#7b7b7b]" />
                    </button>
                    <button
                        className="flex justify-center items-center rounded-md"
                        onClick={() => {
                            setUserToBlock(record);
                            setIsBlockModalVisible(true);
                        }}
                        style={{
                            cursor: 'pointer',
                            border: 'none',
                            outline: 'none',
                            width: '40px',
                            height: '32px',
                        }}
                    >
                        {record?.status === 'active' ? (
                            <CiUnlock size={26} className="text-[#52C41A]" />
                        ) : (
                            <CiLock size={26} className="text-[#FF0000]" />
                        )}
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
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
                            style={{ width: 280, height: 40, backgroundColor: '#F5E9DF' }}
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
                                headerBg: '#2E4F3E26',
                                headerColor: '#2E4F3E',
                                colorBgContainer: '#FAF5E8',
                            },
                        },
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={dashboard ? filteredUser : userData}
                        pagination={
                            dashboard
                                ? false
                                : {
                                      pageSize: pageSize,
                                      total: data?.pagination ? data.pagination?.total : 0,
                                      onChange: (page) => setPage(page),
                                      showSizeChanger: false,
                                  }
                        }
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
            />
        </>
    );
}
