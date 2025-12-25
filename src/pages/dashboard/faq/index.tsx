import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
    useCreateFAQMutation,
    useDeleteFAQMutation,
    useGetFAQQuery,
    useUpdateFAQMutation,
} from '../../../redux/apiSlices/faqSlice';
import toast from 'react-hot-toast';

interface FaqItem {
    _id: string;
    question: string;
    answer: string;
}

const FAQ = () => {
    const [createFAQ, { isLoading: isCreating }] = useCreateFAQMutation();
    const [updateFAQ, { isLoading: isUpdating }] = useUpdateFAQMutation();
    const [deleteFAQ, { isLoading: isDeleting }] = useDeleteFAQMutation();

    const { data, refetch } = useGetFAQQuery({});
    const [faqs, setFaqs] = useState<FaqItem[] | undefined>();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
    const [deleteId, setDeleteId] = useState<string>('');

    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();

    // ADD
    const handleAdd = async () => {
        try {
            const values = await addForm.validateFields();
            await createFAQ(values).unwrap();
            toast.success('FAQ created successfully');
            addForm.resetFields();
            setIsAddOpen(false);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to create FAQ. Please try again.');
        }
    };

    // EDIT
    const openEdit = (item: FaqItem) => {
        setSelectedFaq(item);
        editForm.setFieldsValue(item);
        setIsEditOpen(true);
    };

    const handleEdit = async () => {
        try {
            const values = await editForm.validateFields();
            if (!selectedFaq) return;
            await updateFAQ({ id: selectedFaq._id, faq: values }).unwrap();
            toast.success('FAQ updated successfully');
            setIsEditOpen(false);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update FAQ. Please try again.');
        }
    };

    // DELETE
    const openDelete = (id: string) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    const handleDelete = async () => {
        try {
            await deleteFAQ(deleteId).unwrap();
            toast.success('FAQ deleted successfully');
            setIsDeleteOpen(false);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to delete FAQ. Please try again.');
        }
    };

    useEffect(() => {
        if (data) {
            setFaqs(data.data);
        }
    }, [data]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#2E4F3E',
                },
            }}
        >
            <div className="bg-transparent h-full px-3 py-2 rounded-lg">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3">
                    <h3 className="text-[#757575] text-[18px] font-medium">FAQ</h3>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsAddOpen(true)}
                        style={{
                            background: '#2E4F3E',
                            border: 'none',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Add FAQ
                    </Button>
                </div>

                {/* LIST VIEW - SAME DESIGN AS YOUR ORIGINAL */}
                <div className="pb-6 px-4 rounded-md space-y-8">
                    {faqs?.map((item) => (
                        <div key={item._id} className="flex justify-between items-start gap-4 border-b pb-4 mt-4">
                            {/* Icon */}
                            <div className="mt-3">
                                <GoQuestion color="#2E4F3E" size={25} />
                            </div>

                            {/* Text Section */}
                            <div className="w-full">
                                <p className="text-lg font-medium border-b py-2 px-4 rounded-lg flex items-center gap-8 text-[#757575]">
                                    {item.question}
                                </p>

                                <div className="flex items-start gap-2 py-2 px-4 rounded-lg mt-3">
                                    <p className="text-[#757575] leading-[24px]">{item.answer}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 mt-2">
                                <CiEdit
                                    size={26}
                                    onClick={() => openEdit(item)}
                                    className="cursor-pointer text-[#FFC107]"
                                />
                                <RiDeleteBin6Line
                                    size={24}
                                    onClick={() => openDelete(item._id)}
                                    className="cursor-pointer text-[#D93D04]"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ---------------- Add Modal ---------------- */}
                <Modal
                    centered
                    open={isAddOpen}
                    onCancel={() => setIsAddOpen(false)}
                    onOk={handleAdd}
                    okText="Save"
                    confirmLoading={isCreating}
                    width={450}
                >
                    <h2 className="text-lg font-semibold mb-4">Add FAQ</h2>

                    <Form form={addForm} layout="vertical">
                        <Form.Item name="question" label="Question" rules={[{ required: true }]}>
                            <Input placeholder="Enter question" />
                        </Form.Item>

                        <Form.Item name="answer" label="Answer" rules={[{ required: true }]}>
                            <Input.TextArea rows={4} placeholder="Enter answer" />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* ---------------- Edit Modal ---------------- */}
                <Modal
                    centered
                    open={isEditOpen}
                    onCancel={() => setIsEditOpen(false)}
                    onOk={handleEdit}
                    okText="Update"
                    confirmLoading={isUpdating}
                    width={450}
                >
                    <h2 className="text-lg font-semibold mb-4">Update FAQ</h2>

                    <Form form={editForm} layout="vertical">
                        <Form.Item name="question" label="Question" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="answer" label="Answer" rules={[{ required: true }]}>
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* ---------------- Delete Modal ---------------- */}
                <Modal
                    open={isDeleteOpen}
                    onCancel={() => setIsDeleteOpen(false)}
                    footer={null}
                    loading={isDeleting}
                    closeIcon={<span className="text-gray-400 hover:text-gray-600 text-xl">×</span>}
                    width={400}
                    centered
                >
                    <div className="p-4 text-center">
                        <p className="text-[#272728] text-xl">Are you sure?</p>
                        <p className="pt-4 pb-10 text-[#898888]">
                            Do you really want to delete these records? This process cannot be undone.
                        </p>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setIsDeleteOpen(false)}
                                className="text-[#272728] bg-white px-6 py-2 rounded-md border"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-[#EA545526] text-[#EA5455] px-6 py-2 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default FAQ;
