import type React from 'react';
import { Modal, Form, Input, ConfigProvider } from 'antd';
import { useEffect } from 'react';
import {
    useAddCategoryMutation,
    useAddSubCategoryMutation,
    useUpdateCategoryMutation,
    useUpdateSubCategoryMutation,
} from '../../redux/apiSlices/categorySlice';

type CategoryFormValues = {
    categoryName?: string;
    deliveryStatus: 'active' | 'inactive';
};

interface AddEditCategoryModalProps {
    open: boolean;
    onCancel: () => void;
    editingItem?: Record<string, any> | null;
    setEditingItem?: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
    activeTab?: 'category' | 'sub-category' | string;
}

export default function AddEditCategoryModal({
    open,
    onCancel,
    editingItem,
    setEditingItem,
    activeTab,
}: AddEditCategoryModalProps) {
    const [form] = Form.useForm<CategoryFormValues>();
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [addSubCategory] = useAddSubCategoryMutation();
    const [updateSubCategory] = useUpdateSubCategoryMutation();

    useEffect(() => {
        if (editingItem && open) {
            form.setFieldsValue({
                categoryName: editingItem.name,
            });
        }
    }, [editingItem, open, form]);

    const handleFinish = (values: CategoryFormValues) => {
        console.log(activeTab);
        console.log(values);

        if (activeTab === 'category') {
            if (editingItem) {
                updateCategory({ id: editingItem.id, name: values.categoryName }).unwrap();
            } else {
                addCategory({ name: values.categoryName }).unwrap();
            }
        } else if (activeTab === 'subcategory') {
            if (editingItem) {
                updateSubCategory({ id: editingItem.id, name: values.categoryName }).unwrap();
            } else {
                addSubCategory({ name: values.categoryName }).unwrap();
            }
        }

        form.resetFields();
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#2E4F3E' } }}>
            <Modal
                centered
                open={open}
                title={
                    editingItem
                        ? `Edit ${activeTab === 'category' ? 'Category' : 'Sub-Category'}`
                        : `Add ${activeTab === 'category' ? 'Category' : 'Sub-Category'}`
                }
                onCancel={() => {
                    form.resetFields();
                    onCancel();
                    setEditingItem?.(null);
                }}
                onOk={() => form.submit()}
                okText={editingItem ? 'Update' : 'Add'}
                destroyOnClose
                width={500}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        name="categoryName"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter a name' }]}
                    >
                        <Input style={{ height: 48 }} placeholder="Enter category name" />
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
}
