import { ConfigProvider, Input, Table, Tooltip } from 'antd';
import type { ColumnType } from 'antd/es/table/interface';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { Report } from '../../../types/types';
import { useState } from 'react';
import { imageUrl } from '../../../redux/api/baseApi';
import { useGetAllReportsQuery } from '../../../redux/apiSlices/reportsSlice';
import { BsThreeDots } from 'react-icons/bs';

export default function Reports() {
    const limit = 8;
    const [page, setPage] = useState(1);
    const { data } = useGetAllReportsQuery({ page, limit });
    const reportsData = data?.data;

    const columns: ColumnType<Report>[] = [
        {
            title: 'Serial No.',
            dataIndex: 'serialNo',
            key: 'serialNo',
            responsive: ['sm'],
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: 'User',
            dataIndex: 'userName',
            key: 'userName',
            responsive: ['md'] as any,
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
                            record?.user?.image && record?.user?.image.startsWith('http')
                                ? record?.user?.image
                                : record?.user?.image
                                ? `${imageUrl}${record?.user?.image}`
                                : '/default-avatar.jpg'
                        }
                        className="w-10 h-10 object-cover rounded-full"
                    />

                    <p className="text-sm capitalize">{record?.user?.name}</p>
                </div>
            ),
        },
        {
            title: 'Report Type',
            dataIndex: 'type',
            key: 'type',
            responsive: ['md'] as any,
        },
        {
            title: 'Reported Item',
            dataIndex: 'type',
            key: 'type',
            responsive: ['md'] as any,
            render: (_, record) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                        }}
                    >
                        <img
                            src={
                                record?.type === 'User'
                                    ? record?.reportedUser?.image?.startsWith('http')
                                        ? record.reportedUser.image
                                        : `${imageUrl}${record?.reportedUser?.image}`
                                    : record?.item?.images?.[0]?.startsWith('http')
                                    ? record.item.images?.[0]
                                    : `${imageUrl}${record.item.images?.[0]}`
                            }
                            className="w-10 h-10 object-cover rounded-full"
                        />

                        <p className="text-sm capitalize">{record?.user?.name}</p>
                    </div>
                );
            },
        },
        {
            title: 'Description',
            dataIndex: 'reson',
            key: 'reson',
            responsive: ['md'] as any,
            render: (text) => {
                const shortText = text && text.length > 15 ? text.substring(0, 15) + '...' : text;
                return (
                    <span className="w-44 flex justify-between items-center">
                        {shortText}
                        {text && text.length > 15 && (
                            <Tooltip title={text}>
                                <BsThreeDots className="ml-2 bg-gray-500 h-6 w-6 rounded-sm p-1 cursor-pointer" />
                            </Tooltip>
                        )}
                    </span>
                );
            },
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_: any, record: Report) => (
        //         <div className="flex gap-2">
        //             <Button
        //                 type="text"
        //                 icon={<CiCircleInfo size={24} />}
        //                 className="text-gray-500 hover:text-blue-500"
        //                 onClick={() => setShowOrderDetails(record)}
        //             />
        //         </div>
        //     ),
        // },
    ];

    return (
        <>
            <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title="Reports" />
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
                        dataSource={reportsData as any}
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
        </>
    );
}
