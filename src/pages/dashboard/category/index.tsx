import { useState } from 'react';
import { Button, ConfigProvider, Table, Tabs, message } from 'antd';
import type { ColumnType } from 'antd/es/table';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CategoryTypes } from '../../../types/types';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import AddEditCategoryModal from '../../../components/modals/AddEditCategoryModal';
import DeleteModal from '../../../components/modals/DeleteModal';

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
    'Forfield',
    'Noperville',
    'Orange',
    'Toledo',
    'Austin',
];

const categoryData: CategoryTypes[] = [
    {
        key: '1',
        categoryName: 'Mountains',
        categoryImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&q=80',
        status: 'active',
    },
    {
        key: '2',
        categoryName: 'Forest',
        categoryImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=80',
        status: 'active',
    },
    {
        key: '3',
        categoryName: 'Beach',
        categoryImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80',
        status: 'inactive',
    },
    {
        key: '4',
        categoryName: 'Waterfall',
        categoryImage: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=200&q=80',
        status: 'active',
    },
    {
        key: '5',
        categoryName: 'Desert',
        categoryImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&q=80',
        status: 'inactive',
    },
    {
        key: '6',
        categoryName: 'Lake',
        categoryImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&q=80',
        status: 'active',
    },
];

const subCategoryData: CategoryTypes[] = [
    {
        key: '1',
        subCategoryName: 'Snowy Peaks',
        status: 'active',
    },
    {
        key: '2',
        subCategoryName: 'Rocky Hills',
        status: 'active',
    },
    {
        key: '3',
        subCategoryName: 'Pine Forest',
        status: 'active',
    },
    {
        key: '4',
        subCategoryName: 'Rainforest',
        status: 'inactive',
    },
    {
        key: '5',
        subCategoryName: 'Golden Beach',
        status: 'active',
    },
    {
        key: '6',
        subCategoryName: 'Coral Shore',
        status: 'inactive',
    },
    {
        key: '7',
        subCategoryName: 'Freshwater Lake',
        status: 'active',
    },
    {
        key: '8',
        subCategoryName: 'Desert Dunes',
        status: 'inactive',
    },
];

const statusColorMap = {
    active: { color: '#52C41A', bg: '#2E4F3E40' },
    inactive: { color: '#FF4D4F', bg: '#FFCCCC' },
};

export default function Category({ dashboard }: { dashboard?: boolean }) {
    const [activeTab, setActiveTab] = useState<'category' | 'subcategory'>('category');
    const [categoryList, setCategoryList] = useState<CategoryTypes[]>(categoryData);
    const [subCategoryList, setSubCategoryList] = useState<CategoryTypes[]>(subCategoryData);

    // modal states
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CategoryTypes | null>(null);
    const [deletingKey, setDeletingKey] = useState<string | null>(null);

    const handleAddEditSubmit = (values: Partial<CategoryTypes>) => {
        if (editingItem) {
            const updated = (activeTab === 'category' ? categoryList : subCategoryList).map((item) =>
                item.key === editingItem.key ? { ...item, ...values } : item,
            );
            activeTab === 'category' ? setCategoryList(updated) : setSubCategoryList(updated);
            message.success('Updated successfully!');
        } else {
            const newItem: CategoryTypes = {
                key: Date.now().toString(),
                categoryName: '',
                status: 'active',
                ...values,
            };
            activeTab === 'category'
                ? setCategoryList([...categoryList, newItem])
                : setSubCategoryList([...subCategoryList, newItem]);
            message.success('Added successfully!');
        }
        setIsAddEditModalOpen(false);
        setEditingItem(null);
    };

    const handleDeleteConfirm = () => {
        const updated = (activeTab === 'category' ? categoryList : subCategoryList).filter(
            (item) => item.key !== deletingKey,
        );
        activeTab === 'category' ? setCategoryList(updated) : setSubCategoryList(updated);
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
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Category Image',
            dataIndex: 'categoryImage',
            key: 'categoryImage',
            responsive: ['sm'] as any,
            render: (categoryImage: string) => (
                <img src={categoryImage} alt="category" className="w-8 h-8 rounded-lg" />
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: CategoryTypes['status']) => {
                const currentStyle =
                    status in statusColorMap
                        ? statusColorMap[status as keyof typeof statusColorMap]
                        : { color: '#595959', bg: '#FAFAFA' };

                return (
                    <p className="capitalize px-1 py-0.5 rounded-lg max-w-40" style={{ color: currentStyle.color }}>
                        {status}
                    </p>
                );
            },
        },
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
        },
        {
            title: 'Sub-Category Name',
            dataIndex: 'subCategoryName',
            key: 'subCategoryName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: CategoryTypes['status']) => {
                const currentStyle =
                    status in statusColorMap
                        ? statusColorMap[status as keyof typeof statusColorMap]
                        : { color: '#595959', bg: '#FAFAFA' };

                return (
                    <p
                        className="capitalize px-1 py-0.5 rounded-lg max-w-40"
                        style={{ color: currentStyle.color }}
                    >
                        {status}
                    </p>
                );
            },
        },
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
                                    pagination={dashboard ? false : { pageSize: 9, total: categoryList.length }}
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
                                    pagination={dashboard ? false : { pageSize: 9, total: subCategoryList.length }}
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
                onSubmit={handleAddEditSubmit}
                editingItem={editingItem}
                activeTab={activeTab}
                canadianCities={canadianCities}
            />

            <DeleteModal
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}
