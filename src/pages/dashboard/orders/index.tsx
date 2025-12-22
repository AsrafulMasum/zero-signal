import { Button, ConfigProvider, Input, Select, Table } from 'antd';
import type { ColumnType } from 'antd/es/table/interface';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { Order } from '../../../types/types';
import { CiCircleInfo } from 'react-icons/ci';
import { useState } from 'react';
import OrderDetailsModal from '../../../components/modals/OrderDetailsModal';
import { StatCard } from '../dashboard';
import { GiKeyring, GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import TotalRevenueChart from './TotalRevenueChart';
import SubscriptionPlansChart from './SubscriptionPlansChart';

const { Option } = Select;

const canadianCities = [
    'Toronto',
    'Vancouver',
    'Montreal',
    'Calgary',
    'Edmonton',
    'Ottawa',
    'Winnipeg',
    'Quebec City',
    'Hamilton',
    'Kitchener',
    'London',
    'Victoria',
    'Halifax',
    'Oshawa',
    'Windsor',
    'Saskatoon',
    'Regina',
    'St. Johns',
    'Barrie',
    'Kelowna',
    'Abbotsford',
    'Sherbrooke',
    'Guelph',
    'Kingston',
    'Forfield', // From your original data
    'Noperville', // From your original data
    'Orange', // From your original data
    'Toledo', // From your original data
    'Austin', // From your original data
];

const data: Order[] = [
    {
        key: '1',
        orderNumber: 'ORD-1001',
        customerName: 'John Doe',
        email: 'john.doe@example.com',
        chefName: 'Chef Ramsey',
        itemCount: 5,
        city: 'Toronto',
        price: 120,
        revenue: 600,
        orderData: '2025-11-01',
        deliveryStatus: 'completed',
        status: 'active',
        productImage: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=80',
    },
    {
        key: '2',
        orderNumber: 'ORD-1002',
        customerName: 'Jane Smith',
        email: 'jane.smith@example.com',
        chefName: 'Chef Oliver',
        itemCount: 3,
        city: 'Vancouver',
        price: 85,
        revenue: 255,
        orderData: '2025-11-02',
        deliveryStatus: 'pending',
        status: 'active',
        productImage: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&auto=format&fit=crop&q=80',
    },
    {
        key: '3',
        orderNumber: 'ORD-1003',
        customerName: 'Michael Brown',
        email: 'michael.brown@example.com',
        chefName: 'Chef Marie',
        itemCount: 7,
        city: 'Montreal',
        price: 150,
        revenue: 1050,
        orderData: '2025-11-03',
        deliveryStatus: 'delivered',
        status: 'inactive',
        productImage: 'https://images.unsplash.com/photo-1605478571962-9b8d2b8e8f5a?w=500&auto=format&fit=crop&q=80',
    },
    {
        key: '4',
        orderNumber: 'ORD-1004',
        customerName: 'Emily Davis',
        email: 'emily.davis@example.com',
        chefName: 'Chef Luca',
        itemCount: 2,
        city: 'Calgary',
        price: 60,
        revenue: 120,
        orderData: '2025-11-04',
        deliveryStatus: 'cancelled',
        status: 'inactive',
        productImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80',
    },
    {
        key: '5',
        orderNumber: 'ORD-1005',
        customerName: 'Robert Wilson',
        email: 'robert.wilson@example.com',
        chefName: 'Chef Kim',
        itemCount: 4,
        city: 'Ottawa',
        price: 95,
        revenue: 380,
        orderData: '2025-11-05',
        deliveryStatus: 'completed',
        status: 'active',
        productImage: 'https://images.unsplash.com/photo-1604909052868-92a5b4b6e6cf?w=500&auto=format&fit=crop&q=80',
    },
    {
        key: '6',
        orderNumber: 'ORD-1001',
        customerName: 'John Doe',
        email: 'john.doe@example.com',
        chefName: 'Chef Ramsey',
        itemCount: 5,
        city: 'Toronto',
        price: 120,
        revenue: 600,
        orderData: '2025-11-01',
        deliveryStatus: 'completed',
        status: 'active',
        productImage: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=80',
    },
    {
        key: '7',
        orderNumber: 'ORD-1002',
        customerName: 'Jane Smith',
        email: 'jane.smith@example.com',
        chefName: 'Chef Oliver',
        itemCount: 3,
        city: 'Vancouver',
        price: 85,
        revenue: 255,
        orderData: '2025-11-02',
        deliveryStatus: 'pending',
        status: 'active',
        productImage: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&auto=format&fit=crop&q=80',
    },
    {
        key: '8',
        orderNumber: 'ORD-1003',
        customerName: 'Michael Brown',
        email: 'michael.brown@example.com',
        chefName: 'Chef Marie',
        itemCount: 7,
        city: 'Montreal',
        price: 150,
        revenue: 1050,
        orderData: '2025-11-03',
        deliveryStatus: 'delivered',
        status: 'inactive',
        productImage: 'https://images.unsplash.com/photo-1605478571962-9b8d2b8e8f5a?w=500&auto=format&fit=crop&q=80',
    },
    {
        key: '9',
        orderNumber: 'ORD-1004',
        customerName: 'Emily Davis',
        email: 'emily.davis@example.com',
        chefName: 'Chef Luca',
        itemCount: 2,
        city: 'Calgary',
        price: 60,
        revenue: 120,
        orderData: '2025-11-04',
        deliveryStatus: 'cancelled',
        status: 'inactive',
        productImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80',
    },
    {
        key: '10',
        orderNumber: 'ORD-1005',
        customerName: 'Robert Wilson',
        email: 'robert.wilson@example.com',
        chefName: 'Chef Kim',
        itemCount: 4,
        city: 'Ottawa',
        price: 95,
        revenue: 380,
        orderData: '2025-11-05',
        deliveryStatus: 'completed',
        status: 'active',
        productImage: 'https://images.unsplash.com/photo-1604909052868-92a5b4b6e6cf?w=500&auto=format&fit=crop&q=80',
    },
];

const statusColorMap = {
    pending: { color: '#D48806', bg: '#F7F1CC' },
    processing: { color: '#1890FF', bg: '#D9EEFF' },
    shipped: { color: '#13C2C2', bg: '#CCFAF9' },
    cancelled: { color: '#FF4D4F', bg: '#FFD8D7' },
    completed: { color: '#52C41A', bg: '#D9F2CD' },
    returned: { color: '#FF0000', bg: '#FFCCCC' },
};

export default function Orders() {
    const [showOrderDetails, setShowOrderDetails] = useState<Order | null>(null);
    const [showAll, setShowAll] = useState(false);

    const filteredData = showAll ? data : data.slice(0, 4);

    const columns: ColumnType<Order>[] = [
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            responsive: ['sm'] as any,
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Chef Name',
            dataIndex: 'chefName',
            key: 'chefName',
        },
        {
            title: 'Item count',
            dataIndex: 'itemCount',
            key: 'itemCount',
            responsive: ['md'] as any,
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            responsive: ['lg'] as any,
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }: {
                setSelectedKeys?: (keys: React.Key[]) => void;
                selectedKeys?: React.Key[];
                confirm?: () => void;
                clearFilters?: () => void;
            }) => (
                <div style={{ padding: 8 }}>
                    <Select
                        placeholder="Select a Canadian city"
                        value={selectedKeys?.[0] ?? undefined}
                        style={{ width: 200 }}
                        onChange={(value) => {
                            setSelectedKeys?.(value ? [value] : []);
                            confirm?.();
                        }}
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                            (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {canadianCities?.map((city) => (
                            <Option key={city} value={city}>
                                {city}
                            </Option>
                        ))}
                    </Select>
                    <div style={{ marginTop: 8 }}>
                        <a
                            onClick={() => {
                                clearFilters?.();
                                confirm?.();
                            }}
                            style={{ width: 90, marginRight: 8 }}
                        >
                            Reset
                        </a>
                    </div>
                </div>
            ),
            onFilter: (value: boolean | React.Key, record: Order) => record.city === value,
            render: (city: string) => city,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            responsive: ['sm'] as any,
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            responsive: ['lg'] as any,
        },
        {
            title: 'Date',
            dataIndex: 'orderData',
            key: 'orderData',
            responsive: ['sm'] as any,
        },
        {
            title: 'Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (status: Order['deliveryStatus'], record: Order) => {
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
            render: (_: any, record: Order) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => setShowOrderDetails(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            {!showAll && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-4">
                    <StatCard
                        icon={<GiMoneyStack />}
                        title="Monthly Revenue"
                        value="AED 45,085"
                        className="bg-[#9810FA1A] text-[#9810FA]"
                    />
                    <StatCard
                        icon={<GiTakeMyMoney />}
                        title="Subscriptions"
                        value="AED 45,085"
                        className="bg-[#00A63E1A] text-[#00A63E]"
                    />
                    <StatCard
                        icon={<GiKeyring />}
                        title="Active Subscriptions"
                        value="169"
                        className="bg-[#095CC71A] text-[#095CC7]"
                    />
                </div>
            )}

            {!showAll && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* Revenue Chart */}
                    <TotalRevenueChart />

                    {/* Users */}
                    <SubscriptionPlansChart />
                </div>
            )}

            <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title="All Transactions" />
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#2E4F3E',
                            },
                        }}
                    >
                        {showAll ? (
                            <Input
                                placeholder="Search"
                                className=""
                                style={{ width: 280, height: 40 }}
                                prefix={<i className="bi bi-search"></i>}
                            />
                        ) : (
                            <button className="text-[#2E4F3E] underline text-sm" onClick={() => setShowAll(true)}>
                                View All
                            </button>
                        )}
                    </ConfigProvider>
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
                        dataSource={filteredData as any}
                        
                        pagination={showAll ? { pageSize: 9, total: data.length } : false}
                        className="custom-table"
                    />
                </ConfigProvider>
            </div>
            <OrderDetailsModal showOrderDetails={showOrderDetails} setShowOrderDetails={setShowOrderDetails} />
        </>
    );
}
