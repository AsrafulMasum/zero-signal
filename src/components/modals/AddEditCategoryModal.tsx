import type React from 'react';
import { Modal, Form, Input, Select, ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';

const { Option } = Select;

type CategoryFormValues = {
    categoryName?: string;
    deliveryStatus: 'active' | 'inactive';
};

interface AddEditCategoryModalProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    editingItem?: Record<string, any> | null;
    setEditingItem?: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
    activeTab?: 'category' | 'sub-category' | string;
}

export default function AddEditCategoryModal({
    open,
    onCancel,
    onSubmit,
    editingItem,
    setEditingItem,
    activeTab,
}: AddEditCategoryModalProps) {
    const [form] = Form.useForm<CategoryFormValues>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    console.log(editingItem);
    useEffect(() => {
        if (editingItem && open) {
            form.setFieldsValue({
                categoryName: editingItem.categoryName,
                deliveryStatus: editingItem.status,
            });

            if (editingItem.categoryImage) {
                setImagePreview(editingItem.categoryImage);
                setImageFile(null);
            }
        }
    }, [editingItem, open, form]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const handleFinish = (values: CategoryFormValues) => {
        onSubmit({
            ...values,
            categoryImage: imageFile || imagePreview,
        });

        form.resetFields();
        setImageFile(null);
        setImagePreview(null);
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
                    setImagePreview(null);
                    setImageFile(null);
                    onCancel();
                    setEditingItem?.(null);
                }}
                onOk={() => form.submit()}
                okText={editingItem ? 'Update' : 'Add'}
                destroyOnClose
                width={500}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    {activeTab === 'category' && (
                        <Form.Item label="Category Image" required>
                            {imagePreview ? (
                                <div style={{ position: 'relative', width: '100%' }}>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: 200,
                                            border: '2px solid #e8e8e8',
                                            borderRadius: 12,
                                            overflow: 'hidden',
                                            position: 'relative',
                                        }}
                                        onMouseEnter={(e) => {
                                            const btn = e.currentTarget.querySelector('.remove-btn') as HTMLElement;
                                            if (btn) btn.style.opacity = '1';
                                        }}
                                        onMouseLeave={(e) => {
                                            const btn = e.currentTarget.querySelector('.remove-btn') as HTMLElement;
                                            if (btn) btn.style.opacity = '0';
                                        }}
                                    >
                                        <img
                                            src={imagePreview || '/placeholder.svg'}
                                            alt="Category"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <button
                                            type="button"
                                            className="remove-btn"
                                            onClick={handleRemoveImage}
                                            style={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                background: '#ff4d4f',
                                                border: 'none',
                                                color: 'white',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                opacity: 0,
                                                transition: 'opacity 0.2s ease',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label
                                    style={{
                                        width: '100%',
                                        height: 200,
                                        border: '2px dashed #d9d9d9',
                                        borderRadius: 12,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#fafafa',
                                        transition: 'all 0.3s ease',
                                        gap: 12,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#f0f0f0';
                                        e.currentTarget.style.borderColor = '#2E4F3E';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#fafafa';
                                        e.currentTarget.style.borderColor = '#d9d9d9';
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            background: 'rgba(46, 79, 62, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#2E4F3E',
                                        }}
                                    >
                                        <Upload size={24} />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div
                                            style={{ fontSize: 14, fontWeight: 500, color: '#262626', marginBottom: 4 }}
                                        >
                                            Upload an image
                                        </div>
                                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>PNG, JPG, GIF up to 10MB</div>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            top: 0,
                                            left: 0,
                                            opacity: 0,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </label>
                            )}
                        </Form.Item>
                    )}

                    <Form.Item
                        name="categoryName"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter a name' }]}
                    >
                        <Input style={{ height: 48 }} placeholder="Enter category name" />
                    </Form.Item>

                    <Form.Item
                        name="deliveryStatus"
                        label="Status"
                        rules={[{ required: true, message: 'Please select a status' }]}
                    >
                        <Select
                            style={{ width: '100%', height: 48, borderRadius: 6, border: '1px solid #d9d9d9' }}
                            placeholder="Select status"
                        >
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
}
