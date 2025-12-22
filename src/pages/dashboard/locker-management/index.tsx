import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, ConfigProvider, Descriptions, Form, Input, Modal, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { FiEdit, FiSearch } from 'react-icons/fi';
import { StatCard } from '../dashboard';
import { BsHouseLock } from 'react-icons/bs';
import { GiKeyring, GiSandsOfTime } from 'react-icons/gi';
import { LockerType } from '../../../types/types';
import { AiOutlineDelete, AiOutlineExclamationCircle, AiOutlineEye } from 'react-icons/ai';
import { CiLocationOn, CiSettings } from 'react-icons/ci';
import { GoNumber } from 'react-icons/go';
import { PiLockers } from 'react-icons/pi';

// ---------------- Dummy Data -------------------
const lockerData: LockerType[] = [
    {
        lockerID: 'LK-001',
        name: 'Main Entrance Locker',
        lockerLocation: 'Toronto, ON',
        capacity: 40,
        lastActivity: '2025-12-06 14:23',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-002',
        name: 'West Wing Locker',
        lockerLocation: 'Vancouver, BC',
        capacity: 32,
        lastActivity: '2025-12-05 09:15',
        deliveryStatus: 'maintenance',
    },
    {
        lockerID: 'LK-003',
        name: 'Gym Area Locker',
        lockerLocation: 'Calgary, AB',
        capacity: 28,
        lastActivity: '2025-12-07 08:42',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-004',
        name: 'Basement Locker',
        lockerLocation: 'Ottawa, ON',
        capacity: 50,
        lastActivity: '2025-12-06 12:10',
        deliveryStatus: 'offline',
    },
    {
        lockerID: 'LK-005',
        name: 'Parking Lot Locker',
        lockerLocation: 'Winnipeg, MB',
        capacity: 36,
        lastActivity: '2025-12-04 17:22',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-006',
        name: 'Reception Locker',
        lockerLocation: 'Montreal, QC',
        capacity: 22,
        lastActivity: '2025-12-07 09:30',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-007',
        name: 'Warehouse Locker A',
        lockerLocation: 'Edmonton, AB',
        capacity: 60,
        lastActivity: '2025-12-06 16:50',
        deliveryStatus: 'maintenance',
    },
    {
        lockerID: 'LK-008',
        name: 'Warehouse Locker B',
        lockerLocation: 'Edmonton, AB',
        capacity: 55,
        lastActivity: '2025-12-06 11:02',
        deliveryStatus: 'offline',
    },
    {
        lockerID: 'LK-009',
        name: 'Lobby Locker',
        lockerLocation: 'Halifax, NS',
        capacity: 25,
        lastActivity: '2025-12-06 19:44',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-010',
        name: 'Staff Room Locker',
        lockerLocation: 'Regina, SK',
        capacity: 18,
        lastActivity: '2025-12-05 13:27',
        deliveryStatus: 'maintenance',
    },
    {
        lockerID: 'LK-011',
        name: 'Backyard Locker',
        lockerLocation: 'Victoria, BC',
        capacity: 42,
        lastActivity: '2025-12-07 10:05',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-012',
        name: 'North Wing Locker',
        lockerLocation: 'Quebec City, QC',
        capacity: 35,
        lastActivity: '2025-12-05 20:14',
        deliveryStatus: 'offline',
    },
    {
        lockerID: 'LK-013',
        name: 'Conference Room Locker',
        lockerLocation: 'Toronto, ON',
        capacity: 30,
        lastActivity: '2025-12-06 07:55',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-014',
        name: 'Server Room Locker',
        lockerLocation: 'Vancouver, BC',
        capacity: 12,
        lastActivity: '2025-12-07 03:10',
        deliveryStatus: 'maintenance',
    },
    {
        lockerID: 'LK-015',
        name: 'Cafeteria Locker',
        lockerLocation: 'Calgary, AB',
        capacity: 26,
        lastActivity: '2025-12-04 09:18',
        deliveryStatus: 'offline',
    },
    {
        lockerID: 'LK-016',
        name: 'Training Hall Locker',
        lockerLocation: 'Ottawa, ON',
        capacity: 48,
        lastActivity: '2025-12-06 18:01',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-017',
        name: 'Garden Area Locker',
        lockerLocation: 'Winnipeg, MB',
        capacity: 20,
        lastActivity: '2025-12-07 11:25',
        deliveryStatus: 'maintenance',
    },
    {
        lockerID: 'LK-018',
        name: 'Security Room Locker',
        lockerLocation: 'Montreal, QC',
        capacity: 15,
        lastActivity: '2025-12-07 04:40',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-019',
        name: 'Event Hall Locker',
        lockerLocation: 'Edmonton, AB',
        capacity: 52,
        lastActivity: '2025-12-05 15:33',
        deliveryStatus: 'offline',
    },
    {
        lockerID: 'LK-020',
        name: 'South Wing Locker',
        lockerLocation: 'Halifax, NS',
        capacity: 33,
        lastActivity: '2025-12-06 21:12',
        deliveryStatus: 'active',
    },
];

const statusColorMap = {
    maintenance: { color: '#D48806', bg: '#F7F1CC' },
    offline: { color: '#FF4D4F', bg: '#FFD8D7' },
    active: { color: '#52C41A', bg: '#D9F2CD' },
};

const LockerManagement: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [banners, setBanners] = useState<LockerType[]>(lockerData);

    // Modal states
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    console.log(selectedStatus);

    const [editData, setEditData] = useState<LockerType | undefined>(undefined);
    const [viewData, setViewData] = useState<LockerType | undefined>(undefined);
    const [deleteId, setDeleteId] = useState<string>('');

    // ---------------- Search -----------------------
    const filteredData = banners.filter((x) => x.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleModalClose = () => {
        setViewData(undefined);
    };

    // ---------------- Delete -----------------------
    const handleDelete = () => {
        setBanners((prev) => prev.filter((item) => item._id !== deleteId));
        setOpenDeleteModal(false);
    };

    // ---------------- Add --------------------------
    const handleAddBanner = (name: string) => {
        const newItem: LockerType = {
            _id: (banners.length + 1).toString(),
            lockerID: `LK-${String(banners.length + 1).padStart(3, '0')}`,
            name,
            lockerLocation: '',
            capacity: 0,
            lastActivity: new Date().toLocaleString(),
            deliveryStatus: 'active',
        };
        setBanners([...banners, newItem]);
        setOpenAddModal(false);
    };

    // ---------------- Edit --------------------------
    const handleEditBanner = (name: string) => {
        if (!editData) return;

        setBanners((prev) => prev.map((item) => (item._id === editData._id ? { ...item, name } : item)));
        setOpenEditModal(false);
    };

    // ---------------- Columns -----------------------
    const columns: ColumnsType<LockerType> = [
        {
            title: 'Locker ID',
            dataIndex: 'lockerID',
            key: 'lockerID',
        },
        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Locker Location',
            dataIndex: 'lockerLocation',
            key: 'lockerLocation',
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            key: 'capacity',
        },
        {
            title: 'Last Activity',
            dataIndex: 'lastActivity',
            key: 'lastActivity',
        },
        {
            title: 'Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (status: LockerType['deliveryStatus'], record: LockerType) => {
                const key = status as keyof typeof statusColorMap;
                const currentStyle =
                    status in statusColorMap
                        ? statusColorMap[key]
                        : {
                              color: '#595959',
                              bg: '#FAFAFA',
                          };

                return (
                    <p
                        className="capitalize px-1 py-0.5 text-center rounded-lg"
                        style={{
                            color: currentStyle.color,
                            backgroundColor: currentStyle.bg,
                        }}
                    >
                        {record?.deliveryStatus}
                    </p>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <div className="flex justify-end gap-5 py-1.5">
                    <button
                        onClick={() => {
                            setViewData(record);
                        }}
                    >
                        <AiOutlineEye size={24} className="text-secondary" />
                    </button>
                    <button
                        onClick={() => {
                            setEditData(record);
                            setOpenEditModal(true);
                        }}
                    >
                        <FiEdit size={24} className="text-secondary" />
                    </button>

                    <button
                        onClick={() => {
                            setDeleteId(record.lockerID);
                            setOpenDeleteModal(true);
                        }}
                    >
                        <AiOutlineDelete size={24} className="text-[#FC6057]" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="h-full">
            <div style={{ background: '#FFFFFF', borderRadius: '12px' }}>
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
                        className="bg-[#00A63E1A] text-[#00A63E]"
                    />
                    <StatCard
                        icon={<AiOutlineExclamationCircle />}
                        title="Maintenance"
                        value="3"
                        className="bg-[#2E4F3E1A] text-[#2E4F3E]"
                    />
                    <StatCard
                        icon={<CiSettings />}
                        title="Any occupancy"
                        value="45%"
                        className="bg-[#9810FA1A] text-[#9810FA]"
                    />
                </div>
                <Card className="shadow-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">All Lockers</h3>

                        <div className="flex items-center gap-3 mb-4">
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#2E4F3E',
                                    },
                                }}
                            >
                                <Input
                                    placeholder="Search by name, location"
                                    prefix={<FiSearch size={14} color="#868FA0" />}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: 300, height: 40 }}
                                />
                                <Select
                                    placeholder="Status"
                                    style={{ width: 120, height: 40 }}
                                    allowClear
                                    showSearch
                                    onChange={(value) => setSelectedStatus(value)}
                                    filterOption={(input, option) =>
                                        (String(option?.children) ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    <Select.Option value="active">Active</Select.Option>
                                    <Select.Option value="maintenance">Maintenance</Select.Option>
                                    <Select.Option value="offline">Offline</Select.Option>
                                </Select>
                            </ConfigProvider>

                            <button
                                className="bg-primary h-10 px-4 rounded-md text-white text-sm space-x-1"
                                onClick={() => setOpenAddModal(true)}
                            >
                                <PlusOutlined /> Add Locker
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="relative p-2">
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
                                size="large"
                                columns={columns}
                                rowKey="_id"
                                dataSource={filteredData}
                                pagination={{
                                    current: page,
                                    total: filteredData.length,
                                    pageSize: 7,
                                    onChange: (page) => setPage(page),
                                }}
                            />
                        </ConfigProvider>
                    </div>
                </Card>
            </div>

            {/* ---------------- Add Modal ---------------- */}
            <AddOrEditModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                onSubmit={handleAddBanner}
                title="Add Locker"
            />

            {/* ---------------- Edit Modal ---------------- */}
            <AddOrEditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                onSubmit={handleEditBanner}
                lockerData={editData}
                title="Edit Locker"
            />

            <Modal
                title={<span className="text-lg font-semibold">User Details</span>}
                open={viewData !== null && viewData !== undefined}
                onCancel={handleModalClose}
                footer={[
                    <Button key="close" onClick={handleModalClose}>
                        Close
                    </Button>,
                ]}
                width={600}
            >
                {viewData && (
                    <div className="py-4">
                        <Descriptions bordered column={1} size="middle">
                            <Descriptions.Item
                                label={
                                    <span className="font-medium flex items-center">
                                        <GoNumber className="mr-2 size-5" />
                                        Locker ID
                                    </span>
                                }
                            >
                                <Tag color="blue">{viewData.lockerID}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="font-medium flex items-center">
                                        <GiKeyring className="mr-2 size-5" />
                                        Locker Name
                                    </span>
                                }
                            >
                                {viewData.name}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="font-medium flex items-center">
                                        <CiLocationOn className="mr-2 size-5" />
                                        Locker Location
                                    </span>
                                }
                            >
                                {viewData.lockerLocation}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="font-medium flex items-center">
                                        <PiLockers className="mr-2 size-5" />
                                        Capacity
                                    </span>
                                }
                            >
                                {viewData.capacity}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="font-medium flex items-center">
                                        <GiSandsOfTime className="mr-2 size-5" />
                                        Status
                                    </span>
                                }
                            >
                                <Tag
                                    color={
                                        viewData.deliveryStatus === 'active'
                                            ? 'green'
                                            : viewData.deliveryStatus === 'maintenance'
                                            ? 'orange'
                                            : 'red'
                                    }
                                    className="capitalize"
                                >
                                    {viewData.deliveryStatus}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Modal>

            {/* ---------------- Delete Modal ---------------- */}
            <Modal
                centered
                open={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                footer={false}
                width={350}
            >
                <div className="p-4 text-center">
                    <p className="text-[#272728] text-xl">Are you sure?</p>
                    <p className="pt-4 pb-10 text-[#898888]">
                        Do you really want to delete these records? This process cannot be undone.
                    </p>
                    <div className="flex items-center justify-between">
                        <button onClick={handleDelete} className="text-[#272728] bg-white px-6 py-2 rounded-md border">
                            Cancel
                        </button>
                        <button onClick={handleDelete} className="bg-[#EA545526] text-[#EA5455] px-6 py-2 rounded-md">
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LockerManagement;

// ===================================================
//   Add / Edit Modal Component
// ===================================================
interface AddEditProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
    lockerData?: LockerType;
    title: string;
}

const AddOrEditModal: React.FC<AddEditProps> = ({ open, onClose, onSubmit, title, lockerData }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ name: lockerData?.name || '' });
        form.setFieldsValue({ lockerID: lockerData?.lockerID || '' });
        form.setFieldsValue({ location: lockerData?.lockerLocation || '' });
        form.setFieldsValue({ price: lockerData?.price || '100' });
    }, [lockerData]);

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#2E4F3E' } }}>
            <Modal
                open={open}
                onCancel={onClose}
                footer={false}
                centered
                width={450}
                style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                }}
            >
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <Form form={form} onFinish={onSubmit} layout="vertical">
                    <Form.Item name="name" label="Locker Name" rules={[{ required: true }]}>
                        <Input
                            className="h-12"
                            placeholder="e.g.. locker name"
                            style={{
                                backgroundColor: '#FBFBFB',
                                border: 'none',
                                boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.14)',
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="lockerID" label="Locker ID" rules={[{ required: true }]}>
                        <Input
                            className="h-12"
                            placeholder="e.g.. locker id"
                            style={{
                                backgroundColor: '#FBFBFB',
                                border: 'none',
                                boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.14)',
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                        <Input
                            className="h-12"
                            placeholder="Enter location"
                            style={{
                                backgroundColor: '#FBFBFB',
                                border: 'none',
                                boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.14)',
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        <Input
                            type="number"
                            className="h-12 mb-2"
                            placeholder="$ 0.00"
                            style={{
                                backgroundColor: '#FBFBFB',
                                border: 'none',
                                boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.14)',
                            }}
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full mt-5 h-12"
                        style={{ backgroundColor: '#2E4F3E' }}
                    >
                        Save
                    </Button>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};
