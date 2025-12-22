import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import AddInputForm from './AddInputForm';
import EditInputForm from './EditInputForm';
import HeaderTitle from '../../../components/shared/HeaderTitle';

export interface SubscriptionType {
    id: string;
    name: string;
    duration: string;
    price: number;
    features: string[];
}

const Subscription = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editPackage, setEditPackage] = useState<SubscriptionType | null>(null);

    const [packages, setPackages] = useState<SubscriptionType[]>([
        {
            id: '1',
            name: 'Weekly',
            duration: '1 Week',
            price: 19,
            features: ['Access to basic courses', 'Limited community support'],
        },
        {
            id: '2',
            name: 'Monthly',
            duration: '1 Months',
            price: 49,
            features: ['Everything in Basic', 'Priority support', 'Access to premium lessons'],
        },
        {
            id: '3',
            name: 'Annually',
            duration: '12 Months',
            price: 79,
            features: ['Everything in Basic', 'Priority support', 'Access to premium lessons'],
        },
    ]);

    // Handle Add
    const handleAdd = (pkg: SubscriptionType) => {
        setPackages((prev) => [...prev, pkg]);
    };

    // Handle Edit
    const handleEdit = (updatedPkg: SubscriptionType) => {
        setPackages((prev) => prev.map((item) => (item.id === updatedPkg.id ? updatedPkg : item)));
    };

    // Handle Delete
    const handleDelete = () => {
        if (!deleteId) return;
        setPackages((prev) => prev.filter((item) => item.id !== deleteId));
        setShowDelete(false);
    };

    return (
        <div className="bg-[#FFF] pt-4 px-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                {/* <h2 className="text-2xl font-semibold text-{#757575}">Subscription Plans</h2> */}
                <HeaderTitle title="Subscription Plans" />

                <Button
                    onClick={() => setOpenAddModal(true)}
                    style={{
                        // width: 200,
                        height: 40,
                        backgroundColor: '#02002A',
                        border: 'none',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        gap: 8,
                        paddingLeft: 12,
                        paddingRight: 16,
                    }}
                >
                    <PlusOutlined />
                    Add Subscription
                </Button>
            </div>

            {/* Subscription Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className="min-w-[320px] !min-h-[315px] bg-[#FBFBFB] p-4 rounded-lg flex flex-col"
                        style={{
                            boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.14)',
                        }}
                    >
                        {/* Delete Button */}
                        {/* <div className="flex justify-end py-2">
                            <div
                                className="cursor-pointer bg-[#2E4F3E] p-2 rounded-full"
                                onClick={() => {
                                    setDeleteId(pkg.id);
                                    setShowDelete(true);
                                }}
                            >
                                <MdDeleteOutline className="text-xl text-white" />
                            </div>
                        </div> */}

                        {/* Title */}
                        <h4 className="text-[#1A1E25]">Get {pkg.name}</h4>

                        {/* Price */}
                        <h4 className="my-5">
                            <span className="text-3xl text-primary font-semibold">
                                ${pkg.price} <span className="text-[#1A1E25]">/</span>
                            </span>{' '}
                            AED
                        </h4>

                        {/* Features */}
                        <div className="space-y-3 flex-1">
                            {pkg.features.map((feature, idx) => (
                                <div className="flex gap-2" key={idx}>
                                    <IoCheckmarkCircle className="text-[#353355] size-5" />
                                    <p className="text-sm">{feature}</p>
                                </div>
                            ))}
                        </div>

                        {/* Edit Button */}
                        <div className="flex items-center gap-5 pt-5">
                            <button
                                className="cursor-pointer bg-[#F1F1F1] pl-4 pr-6 py-3 rounded text-[#FD3D32] flex items-center gap-2"
                                onClick={() => {
                                    setDeleteId(pkg.id);
                                    setShowDelete(true);
                                }}
                            >
                                <MdDeleteOutline className="text-xl" />
                                <span>Delete</span>
                            </button>
                            <button
                                onClick={() => {
                                    setEditPackage(pkg);
                                    setOpenEditModal(true);
                                }}
                                className="w-full bg-[#2E4F3E] text-white rounded-md text-lg font-medium px-4 py-3"
                                // style={{
                                //     width: '100%',
                                //     height: '40px',
                                //     backgroundColor: '#2E4F3E',
                                //     color: 'white',
                                //     fontWeight: 500,
                                //     border: 'none',
                                //     borderRadius: '4px',
                                //     cursor: 'pointer',
                                // }}
                            >
                                Edit Package
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Modal */}
            <Modal centered open={openAddModal} onCancel={() => setOpenAddModal(false)} width={600} footer={false}>
                <AddInputForm setOpenAddModel={setOpenAddModal} handleAdd={handleAdd} />
            </Modal>

            {/* Edit Modal */}
            <Modal centered open={openEditModal} onCancel={() => setOpenEditModal(false)} width={600} footer={false}>
                <EditInputForm setOpenEditModal={setOpenEditModal} packageData={editPackage} handleEdit={handleEdit} />
            </Modal>

            {/* Delete Modal */}
            <Modal width={350} centered open={showDelete} onCancel={() => setShowDelete(false)} footer={false}>
                <div className="p-4 text-center">
                    <p className="text-[#272728] text-xl">Are you sure?</p>
                    <p className="pt-4 pb-10 text-[#898888]">
                        Do you really want to delete these records? This process cannot be undone.
                    </p>
                    <div className="flex items-center justify-between">
                        <button onClick={handleDelete} className="text-[#272728] bg-white px-6 py-2 rounded-md border">
                            Cancel
                        </button>
                        <button onClick={handleDelete} className="bg-[#EA545526] text-[#EA5455] px-6 py-2 rounded-md">
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Subscription;
