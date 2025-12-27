import type React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Form, Input, ConfigProvider, Select } from 'antd';
import toast from 'react-hot-toast';
import {
    useAddCategoryMutation,
    useAddSubCategoryMutation,
    useAddRouteTypeMutation,
    useUpdateCategoryMutation,
    useUpdateSubCategoryMutation,
    useUpdateRouteTypeMutation,
} from '../../redux/apiSlices/categorySlice';
import { CategoryTypes } from '../../types/types';
import { Upload, X } from 'lucide-react';
import { imageUrl } from '../../redux/api/baseApi';

type CategoryFormValues = {
    categoryName?: string;
    categoryId?: string;
};

interface AddEditCategoryModalProps {
    open: boolean;
    onCancel: () => void;
    editingItem?: Record<string, any> | null;
    setEditingItem?: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
    activeTab?: 'category' | 'subcategory' | 'route';
    refetch?: {
        category?: () => void;
        subcategory?: () => void;
        route?: () => void;
    };
    categoryList?: CategoryTypes[];
}

export default function AddEditCategoryModal({
    open,
    onCancel,
    editingItem,
    setEditingItem,
    activeTab,
    refetch,
    categoryList = [],
}: AddEditCategoryModalProps) {
    const [form] = Form.useForm<CategoryFormValues>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    /* ---------------- API ---------------- */
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    const [addSubCategory] = useAddSubCategoryMutation();
    const [updateSubCategory] = useUpdateSubCategoryMutation();

    const [addRouteType] = useAddRouteTypeMutation();
    const [updateRouteType] = useUpdateRouteTypeMutation();

    /* ---------------- PREFILL ---------------- */
    useEffect(() => {
        if (editingItem && open) {
            form.setFieldsValue({
                categoryName: editingItem.name,
                categoryId: editingItem.category?._id,
            });
        }

        if (editingItem?.icon) {
            setImagePreview(editingItem.icon);
            setImageFile(null);
        }
    }, [editingItem, open, form]);

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    /* ---------------- SUBMIT ---------------- */
    const handleFinish = async (values: CategoryFormValues) => {
        try {
            /* ---------- CATEGORY ---------- */
            if (activeTab === 'category') {
                if (editingItem) {
                    await updateCategory({
                        id: editingItem._id,
                        name: { name: values.categoryName },
                    }).unwrap();
                    toast.success('Category updated');
                } else {
                    await addCategory({ name: values.categoryName }).unwrap();
                    toast.success('Category added');
                }
                refetch?.category?.();
            }

            /* ---------- SUB-CATEGORY ---------- */
            if (activeTab === 'subcategory') {
                if (editingItem) {
                    await updateSubCategory({
                        id: editingItem._id,
                        data: { name: values.categoryName },
                    }).unwrap();
                    toast.success('Sub-category updated');
                } else {
                    await addSubCategory({
                        name: values.categoryName,
                        category: values.categoryId,
                    }).unwrap();
                    toast.success('Sub-category added');
                }
                refetch?.subcategory?.();
            }

            /* ---------- ROUTE TYPE (FORM DATA) ---------- */
            if (activeTab === 'route') {
                const formData = new FormData();
                formData.append('name', values.categoryName || '');

                if (imageFile) {
                    formData.append('image', imageFile);
                }

                if (editingItem) {
                    await updateRouteType({
                        id: editingItem._id,
                        payload: formData,
                    }).unwrap();
                    toast.success('Route type updated');
                } else {
                    await addRouteType(formData).unwrap();
                    toast.success('Route type added');
                }

                refetch?.route?.();
                handleRemoveImage();
            }

            form.resetFields();
            onCancel();
            setEditingItem?.(null);
        } catch (error: any) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    /* ---------------- TITLE ---------------- */
    const modalTitle = editingItem
        ? `Edit ${activeTab === 'category' ? 'Category' : activeTab === 'subcategory' ? 'Sub-Category' : 'Route Type'}`
        : `Add ${activeTab === 'category' ? 'Category' : activeTab === 'subcategory' ? 'Sub-Category' : 'Route Type'}`;

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#2E4F3E' } }}>
            <Modal
                centered
                open={open}
                width={500}
                destroyOnClose
                title={modalTitle}
                okText={editingItem ? 'Update' : 'Add'}
                onOk={() => form.submit()}
                onCancel={() => {
                    form.resetFields();
                    onCancel();
                    setEditingItem?.(null);
                    handleRemoveImage();
                }}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    {/* CATEGORY SELECT (ONLY SUB-CATEGORY ADD) */}
                    {activeTab === 'subcategory' && !editingItem && (
                        <Form.Item
                            name="categoryId"
                            label="Category"
                            rules={[{ required: true, message: 'Please select a category' }]}
                        >
                            <Select
                                size="large"
                                placeholder="Select category"
                                showSearch
                                optionFilterProp="label"
                                options={categoryList.map((cat) => ({
                                    label: cat.name,
                                    value: cat._id,
                                }))}
                                style={{
                                    border: '1px solid #d9d9d9',
                                    borderRadius: 8,
                                }}
                            />
                        </Form.Item>
                    )}

                    {/* NAME */}
                    <Form.Item
                        name="categoryName"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter a name' }]}
                    >
                        <Input
                            size="large"
                            placeholder={
                                activeTab === 'route'
                                    ? 'Enter route type name'
                                    : activeTab === 'subcategory'
                                    ? 'Enter sub-category name'
                                    : 'Enter category name'
                            }
                        />
                    </Form.Item>

                    {/* IMAGE (ONLY ROUTE TYPE) */}
                    {activeTab === 'route' && (
                        <Form.Item label="Route Type Image" required>
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
                                            src={
                                                imagePreview?.startsWith('blob:')
                                                    ? imagePreview
                                                    : imagePreview?.startsWith('http')
                                                    ? imagePreview
                                                    : `${imageUrl}${imagePreview}`
                                            }
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
                                        hidden
                                        onChange={handleImageChange}
                                        className="opacity-0"
                                    />
                                </label>
                            )}
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </ConfigProvider>
    );
}
