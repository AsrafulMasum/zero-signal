import { ConfigProvider, Input, Table } from 'antd';
import type { ColumnType } from 'antd/es/table/interface';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { ActivityTypes } from '../../../types/types';
import { useState } from 'react';
import { imageUrl } from '../../../redux/api/baseApi';
import { useGetAllActivityQuery } from '../../../redux/apiSlices/activitySlice';
import moment from 'moment';

export default function Activity() {
    const limit = 7;
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const { data } = useGetAllActivityQuery({ page, limit, searchTerm: searchText });
    const reportsData = data?.data;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchText(e.target.value);
    };

    const columns: ColumnType<ActivityTypes>[] = [
        {
            title: 'Serial No.',
            dataIndex: 'serialNo',
            key: 'serialNo',
            responsive: ['sm'],
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
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
            title: 'Images',
            dataIndex: 'images',
            key: 'images',
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
                        {record?.images?.map((image: string, index: number) => (
                            <img
                                key={index}
                                src={image.startsWith('http') ? image : `${imageUrl}${image}`}
                                className="w-10 h-10 object-cover rounded-full"
                            />
                        ))}
                    </div>
                );
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (_, record) => <span>{moment(record?.date).format('YYYY-MM-DD')}</span>,
        },
        {
            title: 'Max Participants',
            dataIndex: 'max_participants',
            key: 'max_participants',
        },
        {
            title: 'Current Participants',
            dataIndex: 'current_participants',
            key: 'current_participants',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
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
                            onChange={handleSearchChange}
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
