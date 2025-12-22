import { useState } from 'react';
import { Button, ConfigProvider, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

const initialFaqs: FaqItem[] = [
    {
        id: '1',
        question: 'How do I create an account',
        answer: 'You can create an account by signing up with your email address.',
    },
    {
        id: '2',
        question: 'How can I reset my password',
        answer: 'Click on ‘Forgot Password’ and follow the steps.',
    },
];

const FAQ = () => {
    const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
    const [deleteId, setDeleteId] = useState<string>('');

    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();

    // ADD
    const handleAdd = () => {
        addForm.validateFields().then((values) => {
            const newItem: FaqItem = {
                id: String(Date.now()),
                ...values,
            };
            setFaqs([...faqs, newItem]);
            addForm.resetFields();
            setIsAddOpen(false);
        });
    };

    // EDIT
    const openEdit = (item: FaqItem) => {
        setSelectedFaq(item);
        editForm.setFieldsValue(item);
        setIsEditOpen(true);
    };

    const handleEdit = () => {
        editForm.validateFields().then((values) => {
            if (!selectedFaq) return;
            setFaqs(faqs.map((faq) => (faq.id === selectedFaq.id ? { ...faq, ...values } : faq)));
            setIsEditOpen(false);
        });
    };

    // DELETE
    const openDelete = (id: string) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    const handleDelete = () => {
        setFaqs(faqs.filter((faq) => faq.id !== deleteId));
        setIsDeleteOpen(false);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#2E4F3E',
                },
            }}
        >
            <div className="bg-white h-full px-3 py-2 rounded-lg">
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
                <div className="bg-white pb-6 px-4 rounded-md">
                    {faqs.map((item) => (
                        <div key={item.id} className="flex justify-between items-start gap-4 border-b pb-4 mt-4">
                            {/* Icon */}
                            <div className="mt-3">
                                <GoQuestion color="#2E4F3E" size={25} />
                            </div>

                            {/* Text Section */}
                            <div className="w-full">
                                <p className="text-base font-medium border-b py-2 px-4 rounded-lg bg-[#f8f8f8] flex items-center gap-8 text-[#757575]">
                                    {item.question} ?
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
                                    onClick={() => openDelete(item.id)}
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
                    centered
                    open={isDeleteOpen}
                    onCancel={() => setIsDeleteOpen(false)}
                    onOk={handleDelete}
                    okText="Delete"
                    okButtonProps={{ danger: true }}
                    width={380}
                >
                    <div className="text-center py-6">
                        <p className="text-[#D93D04] font-semibold text-lg">Are you sure?</p>
                        <p className="mt-3 text-gray-700">Do you want to delete this FAQ?</p>
                    </div>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default FAQ;
