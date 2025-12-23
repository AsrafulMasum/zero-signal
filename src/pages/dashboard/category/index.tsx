import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Table, Tabs, message } from 'antd';
import type { ColumnType } from 'antd/es/table';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CategoryTypes } from '../../../types/types';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import AddEditCategoryModal from '../../../components/modals/AddEditCategoryModal';
import DeleteModal from '../../../components/modals/DeleteModal';
import { useGetCategoriesQuery, useGetSubCategoriesQuery } from '../../../redux/apiSlices/categorySlice';

export default function Category() {
    const { data } = useGetCategoriesQuery({});
    const categoryData = data?.data;

    const { data: subCategoryRes } = useGetSubCategoriesQuery({});
    const subCategoryData = subCategoryRes?.data;

    const [activeTab, setActiveTab] = useState<'category' | 'subcategory'>('category');
    const [categoryList, setCategoryList] = useState<CategoryTypes[]>();
    const [subCategoryList, setSubCategoryList] = useState<CategoryTypes[]>(subCategoryData);

    // modal states
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CategoryTypes | null>(null);
    const [deletingKey, setDeletingKey] = useState<string | null>(null);

    useEffect(() => {
        if (categoryData) {
            setCategoryList(categoryData);
        }
        if (subCategoryData) {
            setSubCategoryList(subCategoryData);
        }
    }, [categoryData]);

    const handleDeleteConfirm = () => {
        const subCategoryListUpdated = subCategoryList?.filter((item) => item.key !== deletingKey) || [];
        const categoryListUpdated = categoryList?.filter((item) => item.key !== deletingKey) || [];
        activeTab === 'category' ? setCategoryList(categoryListUpdated) : setSubCategoryList(subCategoryListUpdated);
        setIsDeleteModalOpen(false);
        setDeletingKey(null);
        message.success('Deleted successfully!');
    };

    const columns: ColumnType<CategoryTypes>[] = [
        {
            title: 'Serial No.',
            dataIndex: 'key',
            key: 'key',
            responsive: ['sm'] as any,
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Category Image',
        //     dataIndex: 'categoryImage',
        //     key: 'categoryImage',
        //     responsive: ['sm'] as any,
        //     render: (categoryImage: string) => (
        //         <img src={categoryImage} alt="category" className="w-8 h-8 rounded-lg" />
        //     ),
        // },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (status: CategoryTypes['status']) => {
        //         const currentStyle =
        //             status in statusColorMap
        //                 ? statusColorMap[status as keyof typeof statusColorMap]
        //                 : { color: '#595959', bg: '#FAFAFA' };

        //         return (
        //             <p className="capitalize px-1 py-0.5 rounded-lg max-w-40" style={{ color: currentStyle.color }}>
        //                 {status}
        //             </p>
        //         );
        //     },
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<FiEdit size={20} />}
                        onClick={() => {
                            setEditingItem(record);
                            setIsAddEditModalOpen(true);
                        }}
                    />
                    <Button
                        type="text"
                        icon={<MdOutlineDeleteOutline size={24} />}
                        className="text-red-500"
                        onClick={() => {
                            setDeletingKey(record.key);
                            setIsDeleteModalOpen(true);
                        }}
                    />
                </div>
            ),
        },
    ];

    const subColumns: ColumnType<CategoryTypes>[] = [
        {
            title: 'Serial No.',
            dataIndex: 'key',
            key: 'key',
            responsive: ['sm'] as any,
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Sub-Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (status: CategoryTypes['status']) => {
        //         const currentStyle =
        //             status in statusColorMap
        //                 ? statusColorMap[status as keyof typeof statusColorMap]
        //                 : { color: '#595959', bg: '#FAFAFA' };

        //         return (
        //             <p className="capitalize px-1 py-0.5 rounded-lg max-w-40" style={{ color: currentStyle.color }}>
        //                 {status}
        //             </p>
        //         );
        //     },
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<FiEdit size={20} />}
                        onClick={() => {
                            setEditingItem(record);
                            setIsAddEditModalOpen(true);
                        }}
                    />
                    <Button
                        type="text"
                        icon={<MdOutlineDeleteOutline size={24} />}
                        className="text-red-500"
                        onClick={() => {
                            setDeletingKey(record.key);
                            setIsDeleteModalOpen(true);
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <HeaderTitle title={activeTab === 'category' ? 'Categories' : 'Sub-Categories'} />
                <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
                    <div className="flex justify-end gap-4 mb-4">
                        <button
                            className="bg-primary h-10 px-4 rounded-md text-white text-sm font-semibold"
                            onClick={() => setIsAddEditModalOpen(true)}
                        >
                            Add {activeTab === 'category' ? 'Category' : 'Sub-Category'}
                        </button>
                    </div>
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
                <Tabs
                    defaultActiveKey="category"
                    onChange={(key) => setActiveTab(key as 'category' | 'subcategory')}
                    items={[
                        {
                            key: 'category',
                            label: 'Categories',
                            children: (
                                <Table
                                    columns={columns}
                                    dataSource={categoryList}
                                    rowKey={'_id'}
                                    pagination={{
                                        pageSize: 9,
                                        total: categoryList?.length || 0,
                                    }}
                                    className="custom-table"
                                />
                            ),
                        },
                        {
                            key: 'subcategory',
                            label: 'Sub-Categories',
                            children: (
                                <Table
                                    columns={subColumns}
                                    dataSource={subCategoryList}
                                    rowKey={'_id'}
                                    pagination={{
                                        pageSize: 9,
                                        total: subCategoryList?.length || 0,
                                    }}
                                    className="custom-table"
                                />
                            ),
                        },
                    ]}
                />
            </ConfigProvider>

            {/* Modals */}
            <AddEditCategoryModal
                open={isAddEditModalOpen}
                onCancel={() => setIsAddEditModalOpen(false)}
                editingItem={editingItem}
                setEditingItem={setEditingItem as any}
                activeTab={activeTab}
            />

            <DeleteModal
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}
