import { Button, ConfigProvider, Input, Table } from 'antd';
import type { ColumnType } from 'antd/es/table/interface';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { Spot } from '../../../types/types';
import { CiCircleInfo } from 'react-icons/ci';
import { useState } from 'react';
import OrderDetailsModal from '../../../components/modals/OrderDetailsModal';
import { useGetSpotsQuery } from '../../../redux/apiSlices/spotsSlice';
import { imageUrl } from '../../../redux/api/baseApi';

export default function Spots() {
    const limit = 8;
    const [page, setPage] = useState(1);
    const [showOrderDetails, setShowOrderDetails] = useState<Spot | null>(null);
    const { data } = useGetSpotsQuery({page, limit});
    const spotsData = data?.data;

    const columns: ColumnType<Spot>[] = [
        {
            title: 'Serial No.',
            dataIndex: 'serialNo',
            key: 'serialNo',
            responsive: ['sm'],
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            responsive: ['md'] as any,
            render: (_, record) => <span>{record?.user?.name}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
            responsive: ['md'] as any,
        },
        {
            title: 'Images',
            dataIndex: 'Images',
            key: 'Images',
            responsive: ['md'] as any,
            render: (_, record) => (
                <div className="flex gap-2">
                    {record?.images?.map((image: string, index: number) => (
                        <img
                            key={index}
                            src={image && image?.startsWith('http') ? image : `${imageUrl}${image}`}
                            alt={`Image ${index}`}
                            className="w-10 h-10 object-cover rounded-lg"
                        />
                    ))}
                </div>
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            responsive: ['md'] as any,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            responsive: ['md'] as any,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Spot) => (
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
                        <Input
                            placeholder="Search"
                            className=""
                            style={{ width: 280, height: 40, backgroundColor: '#f5e9df' }}
                            prefix={<i className="bi bi-search"></i>}
                        />
                    </ConfigProvider>
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
                        rowKey={'_id'}
                        dataSource={spotsData as any}
                        pagination={{
                            pageSize: limit,
                            total: data?.pagination?.total,
                            onChange: (page) => setPage(page),
                            showSizeChanger: false,
                        }}
                        className="custom-table"
                    />
                </ConfigProvider>
            </div>
            <OrderDetailsModal showOrderDetails={showOrderDetails} setShowOrderDetails={setShowOrderDetails} />
        </>
    );
}
