import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Table, Tabs } from 'antd';
import type { ColumnType } from 'antd/es/table';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CategoryTypes } from '../../../types/types';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import AddEditCategoryModal from '../../../components/modals/AddEditCategoryModal';
import DeleteModal from '../../../components/modals/DeleteModal';
import {
    useDeleteCategoryMutation,
    useDeleteRouteTypeMutation,
    useDeleteSubCategoryMutation,
    useGetCategoriesQuery,
    useGetRouteTypesQuery,
    useGetSubCategoriesQuery,
} from '../../../redux/apiSlices/categorySlice';
import toast from 'react-hot-toast';
import { imageUrl } from '../../../redux/api/baseApi';

/* ---------------- TYPES ---------------- */
type ActiveTab = 'category' | 'subcategory' | 'route';

const imageColumn: ColumnType<CategoryTypes> = {
    title: 'Image',
    dataIndex: 'icon',
    key: 'icon',
    render: (icon: string) =>
        icon ? (
            <img
                src={icon?.startsWith('http') ? icon : `${imageUrl}${icon}`}
                alt="route"
                className="w-12 h-12 object-cover rounded"
            />
        ) : (
            <span className="text-gray-400">No Image</span>
        ),
};

export default function Category() {
    /* ---------------- API ---------------- */
    const { data: catRes, refetch: catRefetch } = useGetCategoriesQuery({});
    const { data: subRes, refetch: subRefetch } = useGetSubCategoriesQuery({});
    const { data: routeRes, refetch: routeRefetch } = useGetRouteTypesQuery({});

    const [deleteCategory] = useDeleteCategoryMutation();
    const [deleteSubCategory] = useDeleteSubCategoryMutation();
    const [deleteRouteType] = useDeleteRouteTypeMutation();

    /* ---------------- STATE ---------------- */
    const [activeTab, setActiveTab] = useState<ActiveTab>('category');

    const [categoryList, setCategoryList] = useState<CategoryTypes[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<CategoryTypes[]>([]);
    const [routeTypeList, setRouteTypeList] = useState<CategoryTypes[]>([]);

    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CategoryTypes | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    /* ---------------- EFFECT ---------------- */
    useEffect(() => {
        if (catRes?.data) setCategoryList(catRes.data);
        if (subRes?.data) setSubCategoryList(subRes.data);
        if (routeRes?.data) setRouteTypeList(routeRes.data);
    }, [catRes, subRes, routeRes]);

    /* ---------------- DELETE HANDLER ---------------- */
    const handleDeleteConfirm = async () => {
        if (!deletingId) return;

        try {
            if (activeTab === 'category') {
                await deleteCategory(deletingId).unwrap();
                toast.success('Category deleted');
                catRefetch();
            } else if (activeTab === 'subcategory') {
                await deleteSubCategory(deletingId).unwrap();
                toast.success('Sub-category deleted');
                subRefetch();
            } else {
                await deleteRouteType(deletingId).unwrap();
                toast.success('Route type deleted');
                routeRefetch();
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'Delete failed');
        } finally {
            setIsDeleteModalOpen(false);
            setDeletingId(null);
        }
    };

    /* ---------------- COMMON COLUMNS ---------------- */
    const columns: ColumnType<CategoryTypes>[] = [
        {
            title: 'Serial No.',
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title:
                activeTab === 'category'
                    ? 'Category Name'
                    : activeTab === 'subcategory'
                    ? 'Sub-Category Name'
                    : 'Route Type Name',
            dataIndex: 'name',
            key: 'name',
        },
        ...(activeTab === 'route' ? [imageColumn] : []),
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<FiEdit size={18} />}
                        onClick={() => {
                            setEditingItem(record);
                            setIsAddEditModalOpen(true);
                        }}
                    />
                    <Button
                        type="text"
                        icon={<MdOutlineDeleteOutline size={22} />}
                        className="text-red-500"
                        onClick={() => {
                            setDeletingId(record._id);
                            setIsDeleteModalOpen(true);
                        }}
                    />
                </div>
            ),
        },
    ];

    /* ---------------- UI ---------------- */
    return (
        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
                <HeaderTitle
                    title={
                        activeTab === 'category'
                            ? 'Categories'
                            : activeTab === 'subcategory'
                            ? 'Sub-Categories'
                            : 'Route Types'
                    }
                />

                <button
                    className="bg-primary h-10 px-4 rounded-md text-white text-sm font-semibold"
                    onClick={() => setIsAddEditModalOpen(true)}
                >
                    Add{' '}
                    {activeTab === 'category'
                        ? 'Category'
                        : activeTab === 'subcategory'
                        ? 'Sub-Category'
                        : 'Route Type'}
                </button>
            </div>

            {/* TABLE + TABS */}
            <ConfigProvider
                theme={{
                    token: { colorPrimary: '#2E4F3E' },
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
                    onChange={(key) => setActiveTab(key as ActiveTab)}
                    items={[
                        {
                            key: 'category',
                            label: 'Categories',
                            children: (
                                <Table
                                    columns={columns}
                                    dataSource={categoryList}
                                    rowKey="_id"
                                    pagination={{ pageSize: 9 }}
                                />
                            ),
                        },
                        {
                            key: 'subcategory',
                            label: 'Sub-Categories',
                            children: (
                                <Table
                                    columns={columns}
                                    dataSource={subCategoryList}
                                    rowKey="_id"
                                    pagination={{ pageSize: 9 }}
                                />
                            ),
                        },
                        {
                            key: 'route',
                            label: 'Route Types',
                            children: (
                                <Table
                                    columns={columns}
                                    dataSource={routeTypeList}
                                    rowKey="_id"
                                    pagination={{ pageSize: 9 }}
                                />
                            ),
                        },
                    ]}
                />
            </ConfigProvider>

            {/* MODALS */}
            <AddEditCategoryModal
                open={isAddEditModalOpen}
                onCancel={() => {
                    setIsAddEditModalOpen(false);
                    setEditingItem(null);
                }}
                editingItem={editingItem}
                activeTab={activeTab}
                refetch={{
                    category: catRefetch,
                    subcategory: subRefetch,
                    route: routeRefetch,
                }}
                categoryList={categoryList}
            />

            <DeleteModal
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}
