import { Button, ConfigProvider, Input, Modal, Table, Tooltip } from 'antd';
import type { ColumnType } from 'antd/es/table/interface';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { useState } from 'react';
import { imageUrl } from '../../../redux/api/baseApi';
import { BsThreeDots } from 'react-icons/bs';
import { useGetSupportMessagesQuery, useReplySupportMessagesMutation } from '../../../redux/apiSlices/supportsSlice';
import { Support } from '../../../types/types';
import moment from 'moment';
import { VscReply } from 'react-icons/vsc';
import toast from 'react-hot-toast';

const statusColorMap = {
    pending: { color: '#FF4D4F', bg: '#FFD8D7' },
    resolved: { color: '#52C41A', bg: '#D9F2CD' },
};

export default function Supports() {
    const limit = 8;
    const [page, setPage] = useState(1);
    const { data, refetch } = useGetSupportMessagesQuery({ page, limit });
    const supportsData = data?.data;

    const [replySupportMessages, { isLoading }] = useReplySupportMessagesMutation();

    const [value, setValue] = useState<Support | null>(null);

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await replySupportMessages({ id: value?._id, reply: { reply: value?.message } }).unwrap();
            setValue(null);
            if (res.success) {
                toast.success(res?.message);
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const columns: ColumnType<Support>[] = [
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'] as any,
            render: (_, record) => <span>{record?.user?.email}</span>,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (_, record) => <span>{moment(record?.createdAt).format('YYYY-MM-DD')}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: Support['status'], record: Support) => {
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
            title: 'Description',
            dataIndex: 'message',
            key: 'message',
            responsive: ['md'] as any,
            render: (text) => {
                const shortText = text && text.length > 15 ? text.substring(0, 15) + '...' : text;
                return (
                    <span className="w-40 flex justify-between items-center">
                        {shortText}
                        {text && text.length > 15 && (
                            <Tooltip title={text}>
                                <BsThreeDots className="ml-2 bg-[#2e4f3e26] h-6 w-6 rounded-sm p-1 cursor-pointer shadow" />
                            </Tooltip>
                        )}
                    </span>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Support) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<VscReply size={24} />}
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => setValue(record)}
                    />
                </div>
            ),
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
                        dataSource={supportsData as any}
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
            <Modal centered open={!!value} onCancel={() => setValue(null)} width={500} footer={false}>
                <div className="p-6">
                    <h1 className="text-xl font-medium mb-3">Reply A Message</h1>
                    <p className="mb-5">{value?.message}</p>
                    <form onSubmit={handleReply}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Message</label>
                            <textarea
                                placeholder="Enter message"
                                style={{
                                    border: '1px solid #E0E4EC',
                                    padding: '10px',
                                    height: '152px',
                                    background: 'white',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    width: '100%',
                                    resize: 'none',
                                }}
                                name="replyMessage"
                            />
                        </div>
                        <input
                            className="cursor-pointer"
                            style={{
                                width: '100%',
                                border: 'none',
                                height: '44px',
                                background: '#0F78FF',
                                color: 'white',
                                borderRadius: '8px',
                                outline: 'none',
                                padding: '10px 20px',
                            }}
                            value={isLoading ? 'Sending...' : 'Save & change'}
                            type="submit"
                        />
                    </form>
                </div>
            </Modal>
        </>
    );
}
