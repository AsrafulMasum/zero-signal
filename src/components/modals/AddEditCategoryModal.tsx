import type React from 'react';
import { useEffect } from 'react';
import { Modal, Form, Input, ConfigProvider, Select } from 'antd';
import toast from 'react-hot-toast';
import {
    useAddCategoryMutation,
    useAddSubCategoryMutation,
    useUpdateCategoryMutation,
    useUpdateSubCategoryMutation,
} from '../../redux/apiSlices/categorySlice';
import { CategoryTypes } from '../../types/types';

type CategoryFormValues = {
    categoryName?: string;
    categoryId?: string;
};

interface AddEditCategoryModalProps {
    open: boolean;
    onCancel: () => void;
    editingItem?: Record<string, any> | null;
    setEditingItem?: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
    activeTab?: 'category' | 'subcategory' | string;
    refetch?: () => void;
    subCategoryRefetch?: () => void;
    categoryList?: CategoryTypes[];
}

export default function AddEditCategoryModal({
    open,
    onCancel,
    editingItem,
    setEditingItem,
    activeTab,
    refetch,
    subCategoryRefetch,
    categoryList = [],
}: AddEditCategoryModalProps) {
    const [form] = Form.useForm<CategoryFormValues>();

    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [addSubCategory] = useAddSubCategoryMutation();
    const [updateSubCategory] = useUpdateSubCategoryMutation();

    // Prefill form on edit
    useEffect(() => {
        if (editingItem && open) {
            form.setFieldsValue({
                categoryName: editingItem.name,
                categoryId: editingItem.category?._id,
            });
        }
    }, [editingItem, open, form]);

    const handleFinish = async (values: CategoryFormValues) => {
        try {
            // CATEGORY
            if (activeTab === 'category') {
                if (editingItem) {
                    await updateCategory({
                        id: editingItem._id,
                        name: { name: values.categoryName },
                    }).unwrap();

                    toast.success('Category updated successfully');
                } else {
                    await addCategory({
                        name: values.categoryName,
                    }).unwrap();

                    toast.success('Category added successfully');
                }

                refetch?.();
            }

            // SUB-CATEGORY
            if (activeTab === 'subcategory') {
                if (editingItem) {
                    await updateSubCategory({
                        id: editingItem._id,
                        data: {
                            name: values.categoryName,
                        },
                    }).unwrap();

                    toast.success('Sub-Category updated successfully');
                } else {
                    await addSubCategory({
                        name: values.categoryName,
                        category: values.categoryId,
                    }).unwrap();

                    toast.success('Sub-Category added successfully');
                }

                subCategoryRefetch?.();
            }

            form.resetFields();
            onCancel();
            setEditingItem?.(null);
        } catch (error: any) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#2E4F3E' } }}>
            <Modal
                centered
                open={open}
                width={500}
                destroyOnClose
                title={
                    editingItem
                        ? `Edit ${activeTab === 'category' ? 'Category' : 'Sub-Category'}`
                        : `Add ${activeTab === 'category' ? 'Category' : 'Sub-Category'}`
                }
                okText={editingItem ? 'Update' : 'Add'}
                onOk={() => form.submit()}
                onCancel={() => {
                    form.resetFields();
                    onCancel();
                    setEditingItem?.(null);
                }}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    {/* CATEGORY SELECT (ONLY FOR SUBCATEGORY) */}
                    {activeTab === 'subcategory' && !editingItem && (
                        <Form.Item
                            name="categoryId"
                            label="Category"
                            rules={[{ required: true, message: 'Please select a category' }]}
                        >
                            <Select
                                style={{
                                    border: '1px solid #d9d9d9',
                                    borderRadius: 8,
                                }}
                                size="large"
                                placeholder="Select category"
                                showSearch
                                optionFilterProp="label"
                                options={categoryList.map((cat: any) => ({
                                    label: cat.name,
                                    value: cat._id,
                                }))}
                            />
                        </Form.Item>
                    )}

                    {/* NAME INPUT */}
                    <Form.Item
                        name="categoryName"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter a name' }]}
                    >
                        <Input
                            size="large"
                            placeholder={
                                activeTab === 'subcategory' ? 'Enter sub-category name' : 'Enter category name'
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
}
