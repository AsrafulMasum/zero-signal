import { Button, ConfigProvider, Form, Input, Modal, Select, Table } from 'antd';
import { useState } from 'react';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CiCircleInfo } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { PlusOutlined } from '@ant-design/icons';
import { User } from '../../../types/types';
import UserModal from '../users/UserModal';
import BlockModal from '../users/BlockModal';

const { Option } = Select;

const userData: User[] = [
    { key: '1', serialId: 'S-001', userName: 'John Doe', email: 'john.doe@example.com', role: 'Engineer' },
    { key: '2', serialId: 'S-002', userName: 'Jane Smith', email: 'jane.smith@example.com', role: 'Technician' },
    { key: '3', serialId: 'S-003', userName: 'Michael Brown', email: 'michael.brown@example.com', role: 'Accounted' },
    { key: '4', serialId: 'S-004', userName: 'Emily Davis', email: 'emily.davis@example.com', role: 'Engineer' },
    { key: '5', serialId: 'S-005', userName: 'Chris Wilson', email: 'chris.wilson@example.com', role: 'Technician' },
    { key: '6', serialId: 'S-006', userName: 'Sarah Johnson', email: 'sarah.johnson@example.com', role: 'Accounted' },
    { key: '7', serialId: 'S-007', userName: 'David Miller', email: 'david.miller@example.com', role: 'Engineer' },
    { key: '8', serialId: 'S-008', userName: 'Olivia Taylor', email: 'olivia.taylor@example.com', role: 'Technician' },
    {
        key: '9',
        serialId: 'S-009',
        userName: 'Daniel Anderson',
        email: 'daniel.anderson@example.com',
        role: 'Accounted',
    },
    { key: '10', serialId: 'S-010', userName: 'Sophia Thomas', email: 'sophia.thomas@example.com', role: 'Engineer' },
    { key: '11', serialId: 'S-011', userName: 'James Moore', email: 'james.moore@example.com', role: 'Technician' },
    {
        key: '12',
        serialId: 'S-012',
        userName: 'Isabella Martin',
        email: 'isabella.martin@example.com',
        role: 'Accounted',
    },
    { key: '13', serialId: 'S-013', userName: 'William Lee', email: 'william.lee@example.com', role: 'Engineer' },
    { key: '14', serialId: 'S-014', userName: 'Mia Harris', email: 'mia.harris@example.com', role: 'Technician' },
    {
        key: '15',
        serialId: 'S-015',
        userName: 'Benjamin Clark',
        email: 'benjamin.clark@example.com',
        role: 'Accounted',
    },
    {
        key: '16',
        serialId: 'S-016',
        userName: 'Charlotte Lewis',
        email: 'charlotte.lewis@example.com',
        role: 'Engineer',
    },
];

export default function ManageAdmin({ dashboard }: { dashboard?: boolean }) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    const [userToBlock, setUserToBlock] = useState<User | null>(null);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);

    const showUserDetails = (user: User) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const showBlockModal = (user: User) => {
        setUserToBlock(user);
        setIsBlockModalVisible(true);
    };

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

    const onSubmit = () => {
        setOpenAddModal(false);
    };

    const onClose = () => {
        setOpenAddModal(false);
    };

    const columns = [
        {
            title: 'Serial ID',
            dataIndex: 'serialId',
            key: 'serialId',
            responsive: ['sm'] as any,
        },
        {
            title: 'Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'] as any,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            responsive: ['lg'] as any,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: User) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-primary"
                        onClick={() => showUserDetails(record)}
                    />

                    <Button
                        type="text"
                        icon={<MdOutlineDeleteOutline size={24} />}
                        className={'text-red-400 hover:!text-red-500'}
                        onClick={() => showBlockModal(record)}
                    />
                </div>
            ),
        },
    ];

    const [form] = Form.useForm();

    return (
        <>
            <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title="Manage Admin" />
                    <div className="flex items-center gap-4">
                        <Input
                            placeholder="Search"
                            className=""
                            style={{ width: 280, height: 40 }}
                            prefix={<i className="bi bi-search"></i>}
                        />
                        <button
                            className="bg-primary h-10 px-4 rounded-md text-white text-sm space-x-1"
                            onClick={() => setOpenAddModal(true)}
                        >
                            <PlusOutlined /> Add Admin
                        </button>
                    </div>
                </div>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#2E4F3E',
                        },
                        components: {
                            Table: {
                                headerBg: '#FAF5E8',
                                headerColor: '#2E4F3E',
                            },
                        },
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={userData}
                        pagination={dashboard ? false : { pageSize: 9, total: userData.length }}
                        className="custom-table"
                    />
                </ConfigProvider>
            </div>

            <UserModal
                isModalVisible={isModalVisible}
                handleModalClose={handleModalClose}
                selectedUser={selectedUser}
            />

            <ConfigProvider theme={{ token: { colorPrimary: '#2E4F3E' } }}>
                <Modal
                    open={openAddModal}
                    onCancel={onClose}
                    footer={false}
                    centered
                    width={450}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 12,
                    }}
                >
                    <h3 className="text-lg font-semibold mb-4">Add Admin</h3>
                    <Form form={form} onFinish={onSubmit} layout="vertical">
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter a name' }]}
                        >
                            <Input
                                className="h-12"
                                placeholder="Name"
                                style={{
                                    backgroundColor: '#FBFBFB',
                                    border: 'none',
                                    boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.14)',
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please enter an email' },
                                { type: 'email', message: 'Please enter a valid email address' },
                            ]}
                        >
                            <Input
                                className="h-12"
                                placeholder="Email"
                                style={{
                                    backgroundColor: '#FBFBFB',
                                    border: 'none',
                                    boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.14)',
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="password"
                            rules={[{ required: true, message: 'Please enter a password' }]}
                        >
                            <Input.Password
                                className="h-12"
                                placeholder="********"
                                style={{
                                    backgroundColor: '#FBFBFB',
                                    border: 'none',
                                    boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.14)',
                                }}
                            />
                        </Form.Item>

                        {/* Role */}
                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[{ required: true, message: 'Please select a role' }]}
                        >
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorBorder: '#FFF',
                                    },
                                    components: {
                                        Select: {
                                            clearBg: '#FBFBFB',
                                            selectorBg: '#FBFBFB',
                                        },
                                    },
                                }}
                            >
                                <Select
                                    className="h-12 !border-0"
                                    placeholder="Select role"
                                    style={{
                                        backgroundColor: '#FBFBFB',
                                        border: 'none',
                                        boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.14)',
                                    }}
                                >
                                    <Option value="Supervisor">Supervisor</Option>
                                    <Option value="Manager">Manager</Option>
                                    <Option value="Engineer">Engineer</Option>
                                    <Option value="Technician">Technician</Option>
                                    <Option value="Accountant">Accountant</Option>
                                </Select>
                            </ConfigProvider>
                        </Form.Item>

                        <div className="flex items-center justify-between gap-10">
                            <button onClick={onClose} className="text-[#272728] bg-white px-6 py-2 rounded-md border">
                                Cancel
                            </button>

                            <button type="submit" className="bg-[#2E4F3E] text-[#FFF] px-8 py-2 rounded-md">
                                Add Admin
                            </button>
                        </div>
                    </Form>
                </Modal>
            </ConfigProvider>

            <BlockModal
                isBlockModalVisible={isBlockModalVisible}
                handleBlockCancel={handleBlockCancel}
                handleBlockConfirm={handleBlockConfirm}
                isUserBlocked={userToBlock?.status !== 'Active'}
            />
        </>
    );
}
